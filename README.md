# Design de Sobrancelhas

Projeto inicial para um site moderno de design de sobrancelhas com agendamento online e componentes visuais responsivos.

## Tecnologias usadas

- React 18
- Vite
- Tailwind CSS
- Firebase (Firestore)
- FullCalendar
- Framer Motion
- Three.js + React Three Fiber

## Como rodar

1. Abra o terminal na pasta do projeto.
2. Execute `npm install`.
3. Copie o arquivo `.env.example` para `.env` e preencha os valores do Firebase.
4. Execute `npm run dev`.

## Testando Firebase

Após configurar o `.env`, você pode testar a conexão:

### Opção 1: Página de teste
Abra `http://localhost:5173/test-firebase.html` e clique em "Testar Firebase"

### Opção 2: Console do navegador
Abra o console do navegador na página principal e execute:
```javascript
import('./src/testFirebase.js').then(m => m.testFirebase())
```

### Opção 3: Teste direto no formulário
Use o formulário de agendamento na página principal para testar o salvamento.

## Configuração do Firebase

### 1. Criar projeto no Firebase
- Acesse [Firebase Console](https://console.firebase.google.com/)
- Crie um novo projeto
- Ative o Firestore Database

### 2. Configurar Firestore Rules
No Firebase Console, vá para **Firestore > Rules** e cole estas regras:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 3. Obter chaves do Firebase
No Firebase Console, vá para **Configurações do Projeto > Geral > Seus apps**:
- Clique em "Adicionar app" > Web
- Copie as configurações e coloque no arquivo `.env`

## Solução de Problemas
### Erro: "The query requires an index"
**Sintomas:** Calendário não carrega, erro sobre índice composto no Firestore.

**Causa:** Query com múltiplas ordenações (`orderBy('date'), orderBy('slot')`) requer índice composto.

**Solução:** ✅ **Já corrigido automaticamente!** O código agora usa ordenação simples no Firestore e ordenação secundária no JavaScript.
### Erro: "Não foi possível carregar o calendário. Verifique a configuração do Firebase."

**Possíveis causas:**
1. **Arquivo .env não configurado**: Verifique se todas as variáveis estão presentes
2. **Regras do Firestore**: Certifique-se de que permitem leitura/escrita
3. **Chaves incorretas**: Verifique se copiou corretamente do Firebase Console
4. **Projeto não ativo**: Certifique-se de que o projeto Firebase está ativo

**Como resolver:**
1. Execute o teste detalhado em `http://localhost:5173/test-firebase.html`
2. Verifique o console do navegador para mensagens de erro específicas
3. Confirme as regras do Firestore conforme mostrado acima

## Funcionalidades implementadas

### ✅ Agendamento online
- Formulário de agendamento com validação
- Seleção de data, horário e serviço
- Salvamento no Firebase Firestore
- Feedback visual de sucesso/erro
- Timeout automático para evitar travamentos

### ✅ Calendário interativo
- Visualização semanal/mensal/diária
- Eventos em tempo real do Firebase
- Botão de recarregar manual
- Cache local para performance
- Atualização automática após novos agendamentos

### ✅ Visual 3D
- Componente Three.js com curvas rotativas
- Animações suaves com Framer Motion

### ✅ Galeria responsiva
- Filtros por estilo
- Slider antes/depois interativo

## Integração Firebase

- **Configuração**: Copie `.env.example` para `.env` e preencha as credenciais
- **Coleção**: `appointments` no Firestore
- **Estrutura do documento**:
  ```json
  {
    "name": "Nome do cliente",
    "date": "2026-05-08",
    "slot": "10:00",
    "service": "Técnica fio a fio",
    "createdAt": "2026-05-08T12:00:00.000Z"
  }
  ```

## Próximos passos

- Configurar regras de segurança no Firebase
- Adicionar autenticação de usuário
- Implementar notificações por email
- Adicionar sistema de confirmação/cancelamento
- Otimizar performance com lazy loading
