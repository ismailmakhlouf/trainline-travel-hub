# Databricks Apps Deployment Guide

This guide walks through deploying the Trainline Travel Hub to Databricks Apps.

## Prerequisites

- Databricks workspace: `https://fevm-ismailmakhlouf-demo-ws.cloud.databricks.com/`
- Databricks CLI installed and configured
- Personal Access Token (configured below)

## Quick Deploy

### 1. Install Databricks CLI (if not already installed)

```bash
pip install databricks-cli
```

### 2. Configure Databricks CLI

```bash
databricks configure --token
```

When prompted:
- **Host**: `https://fevm-ismailmakhlouf-demo-ws.cloud.databricks.com/`
- **Token**: Use your personal access token (stored securely)

### 3. Build the Application

```bash
npm install
npm run build
```

### 4. Deploy to Databricks Apps

```bash
databricks apps create trainline-travel-hub \
  --source-code-path . \
  --description "Trainline Travel Hub - Multi-modal booking platform"
```

Or deploy from GitHub:

```bash
databricks apps create trainline-travel-hub \
  --git-url https://github.com/ismailmakhlouf/trainline-travel-hub \
  --git-branch main \
  --description "Trainline Travel Hub - Multi-modal booking platform"
```

### 5. Access Your App

Once deployed, your app will be available at:
```
https://fevm-ismailmakhlouf-demo-ws.cloud.databricks.com/apps/trainline-travel-hub
```

## App Configuration

The `app.yaml` file contains the Databricks Apps configuration:
- **Command**: Runs Vite preview server on port 8080
- **Resources**: 1 CPU, 2Gi memory
- **Environment**: Production mode

## Development Workflow

### Local Development
```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`

### Local Preview (Production Mode)
```bash
npm run build
npm run preview
```

Simulates production environment at `http://localhost:4173`

## App Features

### Customer Journey
- **URL**: `/journey` or root `/`
- Interactive booking flow: Search → Itinerary → Transport → Hotel → Payment → Checkout
- Real-time bundle savings calculation
- Loyalty points and tier progression

### Executive Dashboard
- **URL**: `/executive`
- Revenue projections and fleet metrics
- Partner performance analytics
- Adoption scenario modeling

### Seamless View Switching
- Context preserved when switching between customer and executive views
- Shared global state via JourneyContext

## Troubleshooting

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port Conflicts
If port 8080 is in use, modify `app.yaml`:
```yaml
command: ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "8081"]
```

### Memory Issues
Increase memory allocation in `app.yaml`:
```yaml
resources:
  cpu: "2"
  memory: "4Gi"
```

## Updating the App

```bash
# Make changes, commit, and push
git add .
git commit -m "Update: description"
git push

# Redeploy from Databricks
databricks apps update trainline-travel-hub --git-branch main
```

## Monitoring

View app logs:
```bash
databricks apps logs trainline-travel-hub
```

Check app status:
```bash
databricks apps get trainline-travel-hub
```

## Architecture

- **Frontend**: React 18 + TypeScript + Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with dark theme
- **State**: Context API for global journey state
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Support

- **GitHub**: https://github.com/ismailmakhlouf/trainline-travel-hub
- **Issues**: https://github.com/ismailmakhlouf/trainline-travel-hub/issues
