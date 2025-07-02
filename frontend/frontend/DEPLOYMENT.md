# Timber Mountain AI Chat - Deployment Guide

## Prerequisites

- Vercel account (free tier works)
- GitHub repository with the frontend code
- Modal backend already deployed (see backend/DEPLOYMENT.md)

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Run deployment:
   ```bash
   cd frontend
   vercel --prod
   ```

3. Follow the prompts:
   - Link to existing project or create new
   - Set project name: `timber-mountain-chat`
   - Override build settings if needed

4. Set environment variable in Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add:
     - Name: `NEXT_PUBLIC_MODAL_ENDPOINT`
     - Value: `https://andrerand--timber-mountain-chat-chat-endpoint.modal.run`
     - Environment: Production, Preview, Development

### Option 2: Deploy via GitHub Integration

1. Push code to GitHub:
   ```bash
   git add .
   git commit -m "Add Timber Mountain AI Chat frontend"
   git push origin chatbot-frontend
   ```

2. Import to Vercel:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Select the `frontend` directory as root
   - Vercel will auto-detect Next.js

3. Configure environment:
   - Add `NEXT_PUBLIC_MODAL_ENDPOINT` variable
   - Deploy!

## Post-Deployment

### Custom Domain (Optional)

1. In Vercel dashboard, go to "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions

### Performance Monitoring

- Enable Vercel Analytics (free tier available)
- Monitor Core Web Vitals
- Set up alerts for errors

### Testing Production Build

1. Visit your deployment URL
2. Test critical flows:
   - Ask a question using thought starters
   - Type custom question
   - Navigate to About page
   - Check recent chats persist
   - Test on mobile devices

## Environment Variables Reference

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_MODAL_ENDPOINT` | `https://andrerand--timber-mountain-chat-chat-endpoint.modal.run` | Modal API endpoint |

## Troubleshooting

### Build Failures

- Check all environment variables are set
- Ensure Node.js version compatibility (18+)
- Review build logs in Vercel dashboard

### API Connection Issues

- Verify Modal endpoint is accessible
- Check CORS configuration on Modal
- Test endpoint directly with curl

### Performance Issues

- Enable Vercel Edge Network
- Check image optimization
- Review bundle size in build output

## Rollback

If issues occur:
1. Go to Vercel dashboard
2. Navigate to "Deployments"
3. Find previous working deployment
4. Click "..." menu → "Promote to Production"

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Modal Support: https://modal.com/docs