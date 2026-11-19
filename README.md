# ⚡ ATHLON - Treino & Academia (PWA Offline)

Aplicativo web progressivo (PWA) simples, rápido e 100% offline para acompanhamento de treinos na academia, projetado para rodar no navegador do celular (Android/iOS) e ser instalado como aplicativo nativo.

Hospedável gratuitamente no **GitHub Pages**!

---

## ✨ Funcionalidades

1. **Abertura Inteligente no Dia Atual**:
   - Ao abrir o app na segunda-feira, ele já carrega automaticamente o treino programado para segunda-feira.
   - Permite alternar para qualquer outro dia se você quiser adiantar ou repor treino.

2. **Catálogo Completo de Exercícios**:
   - Já vem com mais de 20 exercícios essenciais divididos por grupo muscular (Peito, Costas, Pernas, Ombros, Bíceps, Tríceps, Abdômen).
   - Mostra o equipamento necessário (Barra, Halteres, Máquina, Polia, Colchonete).
   - Permite cadastrar novos exercícios personalizados ou editar os existentes.

3. **Montagem de Rotinas Semanais (Segunda a Domingo)**:
   - Configure o treino para cada dia da semana.
   - Defina séries, repetições alvo e peso (kg) para cada exercício.
   - Repete automaticamente toda semana.

4. **Modo Treino ao Vivo (Live Workout)**:
   - **Cronômetro Geral**: marca o tempo total do treino e compara com sua meta diária (ex: 60 minutos).
   - **Cronômetro por Exercício**: mede exatamente quanto tempo você gasta em cada aparelho.
   - **Checklist de Séries**: marque as séries conforme conclui e ajuste o peso/repetições na hora caso altere a carga.
   - **Timer de Descanso com Alerta**: botões rápidos (30s, 60s, 90s, 2m) com bip sonoro e vibração no celular para avisar quando o intervalo acabou.

5. **Histórico e Métricas**:
   - Registra todos os treinos realizados ao longo do tempo.
   - Salva tempo total, tempo por exercício e séries concluídas.

6. **100% Offline & PWA**:
   - Funciona mesmo sem sinal de internet ou Wi-Fi na academia através do `Service Worker`.
   - Seus dados ficam salvos localmente no celular via `localStorage`.
   - Opção de **Exportar/Importar Backup em JSON** para nunca perder seus dados.

---

## 🚀 Como Publicar no GitHub Pages

Para colocar o app no ar gratuitamente:

1. **Crie um repositório no seu GitHub**:
   - Acesse [github.com/new](https://github.com/new) e crie um repositório (exemplo: `meu-treino`).

2. **Suba os arquivos deste projeto**:
   ```bash
   git init
   git add .
   git commit -m "Primeira versão do Meu Treino PWA"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/meu-treino.git
   git push -u origin main
   ```

3. **Ative o GitHub Pages**:
   - No repositório no GitHub, clique em **Settings** > **Pages** (no menu lateral).
   - Em **Source**, selecione a branch `main` e a pasta `/ (root)`.
   - Clique em **Save**.
   - Em cerca de 1 a 2 minutos, o GitHub vai gerar o link do seu app:  
     `https://SEU_USUARIO.github.io/meu-treino/`

---

## 📱 Como Instalar no Celular Android

1. Abra o link gerado pelo GitHub Pages no navegador **Google Chrome** do seu celular Android.
2. Toque no menu de três pontinhos (⋮) no canto superior direito do Chrome.
3. Toque em **"Instalar aplicativo"** (ou **"Adicionar à tela inicial"**).
4. Pronto! O ícone do app aparecerá na sua tela de início, abrindo em tela cheia sem barras de navegador e funcionando mesmo sem internet.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** semântico e mobile-first.
- **CSS3** moderno com Dark Mode fitness, variáveis CSS e touch otimizado.
- **JavaScript Vanilla** (sem frameworks pesados, carregamento instantâneo).
- **Service Worker & Manifest PWA** para cache offline e instalação.
- **Web Audio API** para sinais sonoros sem arquivos de áudio externos.
