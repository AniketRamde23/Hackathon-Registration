import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Team from '../models/Team.model';
import Registration from '../models/Registration.model';

export const createTeam = async (req: Request, res: Response): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  try {
    const user = req.user.dbUser;
    const { name, projectName, projectDescription, memberDetails } = req.body;

    const registration = await Registration.findOne({ userId: user._id, paymentStatus: { $in: ['pending', 'success'] } });
    if (!registration) {
      return res.status(403).json({ success: false, error: 'Registration required before creating a team' });
    }

    if (registration.teamId) {
      const myExistingTeam = await Team.findById(registration.teamId);
      return res.status(200).json({ success: true, data: myExistingTeam });
    }

    const existingTeam = await Team.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existingTeam) {
      return res.status(400).json({ success: false, error: 'Team name already taken' });
    }

    const team = new Team({
      name,
      projectName,
      projectDescription,
      leaderId: user._id,
      members: [user._id],
      memberDetails: memberDetails || []
    });

    await team.save();

    registration.teamId = team._id as any;
    await registration.save();

    return res.status(201).json({ success: true, data: team });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getMyTeam = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = req.user.dbUser;
    const team = await Team.findOne({ members: user._id }).populate('members', 'name email avatarUrl').populate('leaderId', 'name email');
    
    if (!team) return res.status(404).json({ success: false, error: 'You are not in a team' });
    
    return res.json({ success: true, data: team });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const joinTeamByCode = async (req: Request, res: Response): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  try {
    const user = req.user.dbUser;
    const { inviteCode } = req.body;

    const registration = await Registration.findOne({ userId: user._id, paymentStatus: { $in: ['pending', 'success'] } });
    if (!registration) {
      return res.status(403).json({ success: false, error: 'Registration required before joining a team' });
    }

    if (registration.teamId) {
      return res.status(400).json({ success: false, error: 'You are already in a team' });
    }

    const team = await Team.findOne({ inviteCode: inviteCode.toUpperCase() });
    if (!team) {
      return res.status(404).json({ success: false, error: 'Invalid invite code' });
    }

    if (team.members.length >= team.maxSize) {
      return res.status(400).json({ success: false, error: 'Team is already full' });
    }

    team.members.push(user._id);
    await team.save();

    registration.teamId = team._id as any;
    await registration.save();

    return res.json({ success: true, data: team });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getTeamById = async (req: Request, res: Response): Promise<any> => {
  try {
    const team = await Team.findById(req.params.id).populate('members', 'name');
    if (!team) return res.status(404).json({ success: false, error: 'Team not found' });
    return res.json({ success: true, data: team });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const updateTeam = async (req: Request, res: Response): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  try {
    const user = req.user.dbUser;
    const { id } = req.params;
    const { projectName, projectDescription } = req.body;

    const team = await Team.findById(id);
    if (!team) return res.status(404).json({ success: false, error: 'Team not found' });

    if (team.leaderId.toString() !== user._id.toString()) {
      return res.status(403).json({ success: false, error: 'Only the team leader can update the team' });
    }

    if (projectName !== undefined) team.projectName = projectName;
    if (projectDescription !== undefined) team.projectDescription = projectDescription;

    await team.save();
    return res.json({ success: true, data: team });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const removeMember = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = req.user.dbUser;
    const { id, uid } = req.params;

    const team = await Team.findById(id);
    if (!team) return res.status(404).json({ success: false, error: 'Team not found' });

    if (team.leaderId.toString() !== user._id.toString()) {
      return res.status(403).json({ success: false, error: 'Only the team leader can remove members' });
    }

    if (team.leaderId.toString() === uid) {
      return res.status(400).json({ success: false, error: 'Leader cannot be removed. Disband the team instead.' });
    }

    team.members = team.members.filter(m => m.toString() !== uid);
    await team.save();

    await Registration.findOneAndUpdate({ userId: uid, teamId: team._id }, { $unset: { teamId: 1 } });

    return res.json({ success: true, message: 'Member removed successfully', data: team });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllTeams = async (req: Request, res: Response): Promise<any> => {
  try {
    const teams = await Team.find().populate('members', 'name email').populate('leaderId', 'name');
    return res.json({ success: true, data: teams });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
