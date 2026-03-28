const fs = require('fs');
const path = require('path');

const routes = ['registration', 'team', 'payment', 'ticket', 'score', 'admin'];
const routesDir = path.join(__dirname, 'backend', 'src', 'routes');

const stubContent = `import { Router } from 'express';\n\nconst router = Router();\n\nexport default router;\n`;

routes.forEach(route => {
  fs.writeFileSync(path.join(routesDir, route + '.routes.ts'), stubContent);
});

const socketDir = path.join(__dirname, 'backend', 'src', 'socket');
fs.mkdirSync(socketDir, { recursive: true });
fs.writeFileSync(path.join(socketDir, 'socket.ts'), `import { Server } from 'socket.io';\n\nexport const initSocket = (io: Server) => {\n  io.on('connection', (socket) => {\n    console.log('Client connected:', socket.id);\n  });\n};\n`);

const authPathOld = path.join(routesDir, 'auth.ts');
const authPathNew = path.join(routesDir, 'auth.routes.ts');

if (fs.existsSync(authPathOld)) {
  fs.renameSync(authPathOld, authPathNew);
}

console.log('Successfully stubbed routers and socket script.');
