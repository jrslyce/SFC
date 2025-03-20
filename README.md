# Robot Battle Arena

A text-based robot battle game with dramatic Dragon Ball Z style narratives, betting system, and dice-based combat.

## Features

- Eight unique robots with backstories, attributes, and special abilities
- Dynamic battle system with dice rolls and Dragon Ball Z style narratives
- User account system with credits for betting
- Combat logs with dramatic inner monologues and fan fatalities
- Responsive design for mobile and desktop

## Local Development

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/robot-battle-arena.git
   cd robot-battle-arena
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying to Vercel

### Prerequisites

- A [Vercel](https://vercel.com) account
- [Vercel CLI](https://vercel.com/cli) (optional, for command line deployment)

### Option 1: Deploy with the Vercel CLI

1. Install the Vercel CLI globally:
   ```
   npm install -g vercel
   ```

2. Log in to your Vercel account:
   ```
   vercel login
   ```

3. Deploy your project:
   ```
   vercel
   ```

4. Follow the prompts to complete the deployment.

### Option 2: Deploy via GitHub Integration (Recommended)

1. Push your project to a GitHub repository:
   ```
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)

3. Click "Import Project"

4. Select "Import Git Repository" and connect to your GitHub account

5. Select the repository with your Robot Battle Arena project

6. Configure the following settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

7. Click "Deploy"

### Option 3: Deploy with Vercel's Zero-Config Setup

1. Visit [https://vercel.com/new](https://vercel.com/new)

2. Import your repository from GitHub, GitLab, or Bitbucket

3. Vercel will automatically detect Next.js and configure the build settings

4. Click "Deploy"

## Project Structure

- `/src/components` - React components
- `/src/data` - Game data (robots, etc.)
- `/src/pages` - Next.js pages
- `/src/styles` - CSS styles
- `/src/utils` - Utility functions
- `/public` - Static assets (images, etc.)

## License

[MIT](LICENSE) 