# Controlador de drone Dji Tello.

## Configurações

- Entrar o site da Picovoice treinar um modelo para interpretar os comandos o comandos por voz.
- Baixar o arquivo .rhn e transformar em base 64
- Colocar a string na constante *CLOCK_CONTEXT_64* no arquivo index.html


## executando o projeto

- executar o comando `npm install`
- executar o comando `npm start`
- executar o arquivo `index.html`
- Liberar permissão de microfone no browser.

## Orientações gerais

- Será levantado uma api que responde na porta 3000 (http://localhost:3000).
- Ver o arquivo `CommandParser.js` para ver os comandos que devem ser criados no Picovoice.
