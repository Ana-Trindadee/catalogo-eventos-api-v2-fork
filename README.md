```bash
sudo apt-get update -y && sudo apt-get upgrade -y

sudo apt update -y && sudo apt install git

git config --global core.editor 'code --wait'

git config --global --edit

cd ~

mkdir Projetos

cd ~/Projetos

git clone https://github.com/sobraljhonata/script-python-senac.git

git clone https://github.com/JhonataProf/projeto-basico-com-crud-usuario.git

python3 ~/Projetos/script-python-senac/gerador-api-node-express/main.py

mkdir catalogo-eventos-api

cd catalogo-eventos-api

cp ~/Projetos/projeto-basico-com-crud-usuario/jest-integration-config.js ~/Projetos/projeto-basico-com-crud-usuario/jest-unit-config.ts ~/Projetos/projeto-basico-com-crud-usuario/jest.config.ts ~/Projetos/projeto-basico-com-crud-usuario/nodemon.json ~/Projetos/projeto-basico-com-crud-usuario/tsconfig.json ~/Projetos/projeto-basico-com-crud-usuario/.env-exemplo ~/Projetos/catalogo-eventos-api

mkdir -p ~/Projetos/catalogo-eventos-api/src/core

cp -r ~/Projetos/projeto-basico-com-crud-usuario/src/core/adapters ~/Projetos/projeto-basico-com-crud-usuario/src/core/config ~/Projetos/projeto-basico-com-crud-usuario/src/core/errors ~/Projetos/projeto-basico-com-crud-usuario/src/core/helpers ~/Projetos/projeto-basico-com-crud-usuario/src/core/interfaces ~/Projetos/projeto-basico-com-crud-usuario/src/core/middlewares ~/Projetos/projeto-basico-com-crud-usuario/src/core/protocols ~/Projetos/projeto-basico-com-crud-usuario/src/core/database.ts ~/Projetos/catalogo-eventos-api/src/core

mkdir -p ~/Projetos/catalogo-eventos-api/src/docs/swagger

cp -r ~/Projetos/projeto-basico-com-crud-usuario/src/docs/swagger ~/Projetos/catalogo-eventos-api/src/docs

cp ~/Projetos/projeto-basico-com-crud-usuario/src/server.ts ~/Projetos/catalogo-eventos-api/src

cp ~/Projetos/catalogo-eventos-api/.env-exemplo ~/Projetos/catalogo-eventos-api/.env

cp ~/Projetos/projeto-basico-com-crud-usuario/.gitignore ~/Projetos/catalogo-eventos-api

yarn init -y

yarn add -D @types/bcrypt@^5.0.2 @types/dotenv@^8.2.3 @types/express@^5.0.2 @types/jest@^29.5.13 @types/jsonwebtoken@^9.0.9 @types/node@^22.15.21 @types/supertest@^6.0.3 @types/swagger-jsdoc@^6.0.4 @types/swagger-ui-express@^4.1.8 @types/yamljs@^0.2.34 copyfiles@^2.4.1 jest@^29.7.0 nodemon@^3.1.10 rimraf@^6.0.1 sqlite3@^5.1.7 supertest@^7.1.4 ts-jest@^29.2.5 ts-node@^10.9.2 tsc-alias@^1.8.16 tsconfig-paths@^4.2.0 typescript@^5.8.3

yarn add bcrypt@^6.0.0 dotenv@^16.5.0 express@^5.1.0 fast-glob@^3.3.3 jsonwebtoken@^9.0.2 module-alias@^2.2.3 mysql2@^3.14.1 sequelize@^6.37.7 swagger-jsdoc@^6.2.8 swagger-ui-express@^5.0.1 yaml@^2.8.1 yamljs@^0.3.0 zod@^4.1.12

```

##INSERIR NO FINAL DO ARQUIVO PACKAGE.JSON
```json
"_moduleAliases": {
    "@": "dist"
  }
```
## INSERIR DEPOIS DO "license": "MIT" no ARQUIVO PACKAGE.JSON
```json
  "scripts": {
    "dev": "nodemon",
    "build:clean": "npm run clear:packages && npm run build",
    "clear:packages": "rimraf package-lock.json && rimraf dist && rimraf tsconfig.tsbuildinfo && rimraf node_modules &&npm install",
    "build": "NODE_ENV=production tsc -p tsconfig.json && tsc-alias -p tsconfig.json && npm run copy:swagger",
    "start": "node dist/server.js",
    "start:debug": "node --inspect dist/server.js",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "copy:swagger": "copyfiles -u 2 \"src/docs/**/*\" dist/docs",
    "test": "NODE_ENV=test jest --passWithNoTests --silent --noStackTrace --runInBand",
    "test:verbose": "NODE_ENV=test jest --passWithNoTests --runInBand",
    "test:clear": "npx jest --clearCache",
    "test:unit": "npm test -- --watch -c jest-unit-config.ts",
    "test:integration": "npm test -- --watch -c jest-integration-config.js",
    "test:staged": "npm test -- --findRelatedTests",
    "test:ci": "npm test -- --coverage"
  },
```

```bash
mkdir ~/Projetos/catalogo-eventos-api/src/modules

mkdir -p ~/Projetos/catalogo-eventos-api/src/modules/login/controller ~/Projetos/catalogo-eventos-api/src/modules/login/model ~/Projetos/catalogo-eventos-api/src/modules/login/schemas ~/Projetos/catalogo-eventos-api/src/modules/login/service ~/Projetos/catalogo-eventos-api/src/modules/login/types

cp -r ~/Projetos/projeto-basico-com-crud-usuario/src/controllers/login ~/Projetos/catalogo-eventos-api/src/modules/login/controller

cp -r ~/Projetos/projeto-basico-com-crud-usuario/src/factories ~/Projetos/catalogo-eventos-api/src/modules/login

cp ~/Projetos/projeto-basico-com-crud-usuario/src/models/user-model.ts ~/Projetos/catalogo-eventos-api/src/modules/login/model

cp ~/Projetos/projeto-basico-com-crud-usuario/src/schemas/user.ts ~/Projetos/catalogo-eventos-api/src/modules/login/schemas

cp ~/Projetos/projeto-basico-com-crud-usuario/src/service/usuario-service.ts ~/Projetos/catalogo-eventos-api/src/modules/login/service

cp -r ~/Projetos/projeto-basico-com-crud-usuario/src/types/usuarios ~/Projetos/catalogo-eventos-api/src/modules/login/types

mkdir -p ~/Projetos/catalogo-eventos-api/src/routes/login

cp ~/Projetos/projeto-basico-com-crud-usuario/src/routes/login.ts ~/Projetos/projeto-basico-com-crud-usuario/src/routes/refresh-token.ts ~/Projetos/catalogo-eventos-api/src/routes/login
```

```bash
mkdir -p ~/Projetos/catalogo-eventos-api/src/modules/usuario/controller ~/Projetos/catalogo-eventos-api/src/modules/usuario/model ~/Projetos/catalogo-eventos-api/src/modules/usuario/schemas ~/Projetos/catalogo-eventos-api/src/modules/usuario/service ~/Projetos/catalogo-eventos-api/src/modules/usuario/types

cp -r ~/Projetos/projeto-basico-com-crud-usuario/src/controllers/usuario ~/Projetos/catalogo-eventos-api/src/modules/usuario/controller

cp -r ~/Projetos/projeto-basico-com-crud-usuario/src/factories ~/Projetos/catalogo-eventos-api/src/modules/usuario

cp ~/Projetos/projeto-basico-com-crud-usuario/src/models/user-model.ts ~/Projetos/catalogo-eventos-api/src/modules/usuario/model

cp ~/Projetos/projeto-basico-com-crud-usuario/src/schemas/user.ts ~/Projetos/catalogo-eventos-api/src/modules/usuario/schemas

cp ~/Projetos/projeto-basico-com-crud-usuario/src/service/usuario-service.ts ~/Projetos/catalogo-eventos-api/src/modules/usuario/service

cp -r ~/Projetos/projeto-basico-com-crud-usuario/src/types/usuarios ~/Projetos/catalogo-eventos-api/src/modules/usuario/types

mkdir -p ~/Projetos/catalogo-eventos-api/src/routes/user

cp ~/Projetos/projeto-basico-com-crud-usuario/src/routes/criar-usuario.ts ~/Projetos/projeto-basico-com-crud-usuario/src/routes/editar-usuario.ts ~/Projetos/projeto-basico-com-crud-usuario/src/routes/deletar-usuario.ts ~/Projetos/projeto-basico-com-crud-usuario/src/routes/listar-usuario.ts ~/Projetos/projeto-basico-com-crud-usuario/src/routes/criar-usuario.ts ~/Projetos/catalogo-eventos-api/src/routes/user
```

```bash
git init
git add --all
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/JhonataProf/catalogo-eventos-api-v2.git
git push -u origin main
```