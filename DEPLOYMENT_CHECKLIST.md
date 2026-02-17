# ✅ Deployment Checklist

## Pre-Deployment

### Code Preparation
- [ ] All features tested locally
- [ ] No console.log statements in production code
- [ ] Error handling implemented
- [ ] Loading states added to all async operations
- [ ] All API endpoints tested
- [ ] Google OAuth tested
- [ ] Email functionality tested

### Security
- [ ] .env file not committed to Git
- [ ] .gitignore properly configured
- [ ] JWT_SECRET is strong and unique
- [ ] MongoDB password is secure
- [ ] Google OAuth credentials secured
- [ ] CORS configured for production domains
- [ ] Rate limiting considered (optional)

### Database
- [ ] MongoDB Atlas cluster created
- [ ] Network Access configured (0.0.0.0/0 for cloud deployment)
- [ ] Database users created with proper permissions
- [ ] Test data seeded (optional)
- [ ] Backups enabled (paid tier)
- [ ] Connection string tested

### Environment Variables
- [ ] All required env vars documented in .env.example
- [ ] Production values ready for deployment
- [ ] No hardcoded URLs in code
- [ ] API_URL configurable via environment

---

## Deployment Steps

### GitHub Setup
- [ ] Repository created on GitHub
- [ ] Code pushed to main branch
- [ ] .gitignore working correctly
- [ ] README.md updated with project info

### Backend Deployment (Render/Railway/AWS)
- [ ] Service created
- [ ] Build command configured: `npm install`
- [ ] Start command configured: `node backend/server.js`
- [ ] All environment variables added
- [ ] Service deployed successfully
- [ ] Backend URL copied
- [ ] Health endpoint tested: `/health`

### Frontend Deployment (Render/Vercel/Netlify)
- [ ] Static site created
- [ ] Root directory set to `frontend`
- [ ] Build command: `npm install && npm run build`
- [ ] Publish directory: `frontend/build`
- [ ] REACT_APP_API_URL set to backend URL
- [ ] REACT_APP_GOOGLE_CLIENT_ID set
- [ ] Site deployed successfully
- [ ] Frontend URL copied

### Integration Updates
- [ ] Google OAuth redirect URIs updated with production URLs
- [ ] Backend CORS updated with frontend URL
- [ ] FRONTEND_URL environment variable added to backend
- [ ] Email service tested in production
- [ ] Calendar integration tested (if enabled)

---

## Post-Deployment Testing

### Authentication
- [ ] Login with email/password works
- [ ] Google OAuth login works
- [ ] Logout works
- [ ] Password reset email received
- [ ] JWT token persists on refresh

### Employee Dashboard
- [ ] Dashboard loads correctly
- [ ] Apply for leave works
- [ ] View leave history works
- [ ] Profile update works
- [ ] Mobile number saves
- [ ] Employee ID displays
- [ ] Search functionality works

### Manager Dashboard
- [ ] Dashboard loads with team stats
- [ ] Pending approvals visible
- [ ] Approve leave works
- [ ] Reject leave works
- [ ] Team calendar accessible
- [ ] Search team leaves works

### Admin Dashboard
- [ ] Dashboard loads with system stats
- [ ] User management accessible
- [ ] Leave policies accessible
- [ ] Reports generation works
- [ ] Analytics display correctly
- [ ] Search all users/leaves works

### Integrations
- [ ] Google Calendar sync works (if enabled)
- [ ] Email notifications sent
- [ ] Notification system works
- [ ] Export functionality works

### UI/UX
- [ ] All pages load without errors
- [ ] Images and logos display correctly
- [ ] Background images load
- [ ] Responsive design works on mobile
- [ ] Navigation works correctly
- [ ] Forms validate properly
- [ ] Error messages display correctly

---

## Performance & Monitoring

### Performance
- [ ] Page load time < 3 seconds
- [ ] API response time < 1 second
- [ ] Images optimized
- [ ] No console errors in browser
- [ ] No memory leaks

### Monitoring Setup
- [ ] Uptime monitoring configured (UptimeRobot)
- [ ] Error tracking setup (Sentry - optional)
- [ ] Analytics configured (Google Analytics - optional)
- [ ] Database monitoring enabled (MongoDB Atlas)
- [ ] Server logs accessible

---

## Documentation

### User Documentation
- [ ] User guide created
- [ ] Login credentials shared with users
- [ ] Feature documentation available
- [ ] FAQ created
- [ ] Support contact provided

### Technical Documentation
- [ ] Deployment guide updated
- [ ] API documentation available
- [ ] Environment variables documented
- [ ] Troubleshooting guide created
- [ ] Backup/restore procedures documented

---

## Security Hardening

### Production Security
- [ ] HTTPS enabled (automatic on Render/Vercel)
- [ ] Environment variables secured
- [ ] Database access restricted
- [ ] API rate limiting considered
- [ ] Input validation implemented
- [ ] XSS protection enabled
- [ ] CSRF protection considered

### Access Control
- [ ] Admin accounts secured
- [ ] Role-based access working
- [ ] Password policies enforced
- [ ] Session management secure
- [ ] File upload restrictions (if implemented)

---

## Backup & Recovery

### Backup Strategy
- [ ] Database backup schedule configured
- [ ] Backup retention policy set
- [ ] Backup restoration tested
- [ ] Code repository backed up (GitHub)
- [ ] Environment variables documented securely

### Disaster Recovery
- [ ] Recovery procedures documented
- [ ] RTO (Recovery Time Objective) defined
- [ ] RPO (Recovery Point Objective) defined
- [ ] Rollback procedure tested
- [ ] Emergency contacts listed

---

## Maintenance Plan

### Regular Tasks
- [ ] Weekly: Check logs for errors
- [ ] Weekly: Monitor uptime and performance
- [ ] Monthly: Update dependencies
- [ ] Monthly: Review security alerts
- [ ] Monthly: Test backup restoration
- [ ] Quarterly: Security audit
- [ ] Quarterly: Performance optimization

### Update Procedures
- [ ] Development environment setup
- [ ] Staging environment (optional)
- [ ] Production deployment process
- [ ] Rollback procedure
- [ ] User notification process

---

## Cost Management

### Free Tier Monitoring
- [ ] Render free hours tracked (750/month)
- [ ] MongoDB Atlas storage monitored (512MB free)
- [ ] Bandwidth usage tracked
- [ ] Upgrade plan ready if needed

### Paid Tier Considerations
- [ ] Backend always-on: $7/month (Render)
- [ ] MongoDB M10: $57/month (recommended for production)
- [ ] Custom domain: $12/year (optional)
- [ ] Total estimated: $64-75/month

---

## Go-Live Checklist

### Final Checks
- [ ] All tests passed
- [ ] All features working
- [ ] Performance acceptable
- [ ] Security measures in place
- [ ] Monitoring active
- [ ] Documentation complete
- [ ] Support plan ready

### Communication
- [ ] Users notified of launch
- [ ] Login credentials distributed
- [ ] User guide shared
- [ ] Support channels established
- [ ] Feedback mechanism in place

### Launch
- [ ] Production URL shared
- [ ] Initial users onboarded
- [ ] System monitored for first 24 hours
- [ ] Issues logged and addressed
- [ ] Success metrics tracked

---

## Success Metrics

### Technical Metrics
- Uptime: Target 99.9%
- Page load time: < 3 seconds
- API response time: < 1 second
- Error rate: < 1%
- User satisfaction: > 90%

### Business Metrics
- User adoption rate
- Daily active users
- Leave requests processed
- System usage patterns
- Feature utilization

---

## Emergency Contacts

### Technical Support
- **Hosting**: Render Support (support@render.com)
- **Database**: MongoDB Atlas Support
- **Domain**: Your registrar support
- **Developer**: Your contact info

### Escalation Path
1. Check logs and monitoring
2. Review troubleshooting guide
3. Contact hosting support
4. Rollback if necessary
5. Notify users of issues

---

## Post-Launch

### Week 1
- [ ] Monitor system closely
- [ ] Address any issues immediately
- [ ] Collect user feedback
- [ ] Document any problems
- [ ] Optimize based on usage

### Month 1
- [ ] Review performance metrics
- [ ] Analyze user behavior
- [ ] Plan improvements
- [ ] Update documentation
- [ ] Consider upgrades if needed

---

**Deployment Status**: ⬜ Not Started | 🟡 In Progress | ✅ Complete

**Last Updated**: [Date]
**Deployed By**: [Name]
**Production URL**: [URL]
**Backend URL**: [URL]
