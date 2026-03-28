import { Request, Response } from 'express';
import Score from '../models/Score.model';
import Team from '../models/Team.model';

export const submitScore = async (req: Request, res: Response): Promise<any> => {
  try {
    const judge = req.user.dbUser;
    const { teamId, innovation, technicalComplexity, uiux, presentation, impact, comments } = req.body;

    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ success: false, error: 'Team not found' });

    const existingScore = await Score.findOne({ judgeId: judge._id, teamId });
    if (existingScore) return res.status(400).json({ success: false, error: 'You have already scored this team' });

    const scores = [innovation, technicalComplexity, uiux, presentation, impact];
    if (scores.some(s => s < 0 || s > 20)) {
      return res.status(400).json({ success: false, error: 'Each score criteria must be between 0 and 20' });
    }

    const totalScore = innovation + technicalComplexity + uiux + presentation + impact;

    const score = new Score({
      judgeId: judge._id,
      teamId,
      innovation,
      technicalComplexity,
      uiux,
      presentation,
      impact,
      totalScore,
      comments
    });

    await score.save();

    const io = req.app.get('io');
    if (io) {
      io.to('leaderboard').emit('score:updated', { teamId, newScore: totalScore });
    }

    return res.status(201).json({ success: true, data: score });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getMyScores = async (req: Request, res: Response): Promise<any> => {
  try {
    const judge = req.user.dbUser;
    const scores = await Score.find({ judgeId: judge._id }).populate('teamId', 'name');
    return res.json({ success: true, data: scores });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getTeamScores = async (req: Request, res: Response): Promise<any> => {
  try {
    const { teamId } = req.params;
    const scores = await Score.find({ teamId }).populate('judgeId', 'name');
    return res.json({ success: true, data: scores });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getLeaderboard = async (req: Request, res: Response): Promise<any> => {
  try {
    const leaderboard = await Score.aggregate([
      { 
        $group: {
          _id: '$teamId',
          averageScore: { $avg: '$totalScore' },
          judgeCount: { $sum: 1 },
        }
      },
      { $sort: { averageScore: -1 } },
      { 
        $lookup: { 
          from: 'teams', 
          localField: '_id', 
          foreignField: '_id', 
          as: 'team' 
        } 
      },
      { $unwind: '$team' },
      { 
        $project: {
          teamId: '$_id',
          teamName: '$team.name',
          averageScore: { $round: ['$averageScore', 2] },
          judgeCount: 1,
        }
      }
    ]);

    const rankedLeaderboard = leaderboard.map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));

    return res.json({ success: true, data: rankedLeaderboard });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
