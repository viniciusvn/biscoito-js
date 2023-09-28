# Discord - Bot do biscoito

Este é um bot do Discord que dá biscoito.

## Configuração

Siga estas etapas para configurar e executar o bot em seu ambiente:

### 1. Clone o Repositório

Clone este repositório em sua máquina local:

```bash
git clone https://github.com/viniciusvn/biscoito-js.git
cd biscoito-js
```
### 2. Instale as Dependências
Instale as dependências do projeto usando o npm ou yarn:
```bash
npm install ou yarn install
```

### 3. Configuração das Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto e configure as variáveis de ambiente necessárias. Você precisará definir as seguintes variáveis:

```
TOKEN_BOT=seu-token-do-bot
CLIENT_ID=seu-client-id
GUILD_ID=seu-guild-id
```

### 4. Implantação dos Comandos
Execute o seguinte comando para implantar os comandos no seu servidor do Discord:

```
node deploy-commands.js
```

### 5. Execução do Bot local
Inicie o bot executando o seguinte comando:

```bash 
node index.js
```

## O bot agora está em execução e pronto para ser usado no seu servidor do Discord!

### Como Usar
Aqui estão alguns exemplos de como usar o bot no servidor do Discord:

/ping: O bot responde com 'Pong!'.
/biscoitar: Mencione a pessoa usando o '@' dentro do argumento input para dar um biscoito.
