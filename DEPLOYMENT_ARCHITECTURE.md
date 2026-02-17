# 🏗️ Deployment Architecture

## 🎯 System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         USERS                                │
│  👤 Employees  👔 Managers  🔐 Admins  📱 Mobile Users      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                          │
│  🌐 Render Static Site / Vercel / Netlify                   │
│  • Landing Page                                              │
│  • Login Page (Email + Google OAuth)                         │
│  • Employee Dashboard                                        │
│  • Manager Dashboard                                         │
│  • Admin Dashboard                                           │
│  • Profile Management                                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ REST API (HTTPS)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js/Express)                 │
│  🖥️  Render Web Service / Railway / AWS EC2                 │
│  • Authentication (JWT + Google OAuth)                       │
│  • Leave Management API                                      │
│  • User Management                                           │
│  • Email Service (Nodemailer)                                │
│  • Search API                                                │
│  • Analytics & Reports                                       │
└────────────┬──────────────────────┬─────────────────────────┘
             │                      │
             │                      │
             ▼                      ▼
┌──────────────────────┐  ┌──────────────────────┐
│   DATABASE           │  │   EXTERNAL SERVICES  │
│   MongoDB Atlas      │  │   • Google OAuth     │
│   • Users            │  │   • Gmail SMTP       │
│   • Leaves           │  │   • Google Calendar  │
│   • Policies         │  │                      │
│   • Audit Logs       │  │                      │
└──────────────────────┘  └──────────────────────┘
```

---

## 🌐 Deployment Options Comparison

### Option A: Render (Recommended for Quick Start)

```
┌─────────────────────────────────────────────────────────┐
│                    RENDER PLATFORM                       │
│                                                          │
│  ┌──────────────────────┐    ┌──────────────────────┐  │
│  │  Static Site         │    │  Web Service         │  │
│  │  (Frontend)          │◄───┤  (Backend)           │  │
│  │  • React Build       │    │  • Node.js           │  │
│  │  • CDN Delivery      │    │  • Express API       │  │
│  │  • Auto HTTPS        │    │  • Auto HTTPS        │  │
│  │  • Free Tier         │    │  • Free/Paid Tier    │  │
│  └──────────────────────┘    └──────────────────────┘  │
│                                                          │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │   MongoDB Atlas      │
              │   (Database)         │
              │   • M0 Free Tier     │
              │   • 512MB Storage    │
              └──────────────────────┘
```

**Pros**: Easy setup, free tier, auto-deploy
**Cons**: Free tier sleeps after 15 min
**Cost**: $0 (free) or $7/month (always-on)

---

### Option B: Vercel + Railway

```
┌──────────────────┐         ┌──────────────────┐
│     VERCEL       │         │     RAILWAY      │
│   (Frontend)     │◄────────┤    (Backend)     │
│   • React        │  API    │   • Node.js      │
│   • Edge CDN     │  Calls  │   • Express      │
│   • Free Tier    │         │   • $5 Credit    │
└──────────────────┘         └──────────────────┘
                                      │
                                      ▼
                            ┌──────────────────┐
                            │  MongoDB Atlas   │
                            │   (Database)     │
                            └──────────────────┘
```

**Pros**: Better performance, no sleep, fast CDN
**Cons**: Two platforms to manage
**Cost**: $0-12/month

---

### Option C: AWS Professional Setup

```
┌─────────────────────────────────────────────────────────┐
│                      AWS CLOUD                           │
│                                                          │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────┐  │
│  │   Route 53   │───▶│     ALB      │───▶│   EC2    │  │
│  │   (DNS)      │    │ (Load Bal.)  │    │ Instance │  │
│  └──────────────┘    └──────────────┘    └──────────┘  │
│                                                │         │
│  ┌──────────────┐    ┌──────────────┐        │         │
│  │  CloudFront  │    │      S3      │◄───────┘         │
│  │   (CDN)      │───▶│  (Frontend)  │                  │
│  └──────────────┘    └──────────────┘                  │
│                                                          │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │   MongoDB Atlas      │
              │   M10+ Cluster       │
              │   • Backups          │
              │   • High Availability│
              └──────────────────────┘
```

**Pros**: Full control, scalable, professional
**Cons**: Complex setup, higher cost
**Cost**: $75-150/month

---

## 🔄 Data Flow

### 1. User Login Flow

```
User Browser
    │
    │ 1. Visit https://your-app.com
    ▼
Frontend (React)
    │
    │ 2. Click "Login with Google"
    ▼
Google OAuth
    │
    │ 3. User authenticates
    ▼
Backend API
    │
    │ 4. Verify token
    │ 5. Create/find user
    │ 6. Generate JWT
    ▼
MongoDB
    │
    │ 7. Store/retrieve user
    ▼
Frontend
    │
    │ 8. Store JWT in localStorage
    │ 9. Redirect to dashboard
    ▼
User Dashboard
```

---

### 2. Leave Request Flow

```
Employee Dashboard
    │
    │ 1. Fill leave form
    ▼
Frontend
    │
    │ 2. POST /api/leaves
    ▼
Backend API
    │
    │ 3. Validate JWT
    │ 4. Validate data
    ▼
MongoDB
    │
    │ 5. Save leave request
    ▼
Email Service
    │
    │ 6. Send notification to manager
    ▼
Manager Email
    │
    │ 7. Manager clicks link
    ▼
Manager Dashboard
    │
    │ 8. Approve/Reject
    ▼
Backend API
    │
    │ 9. Update leave status
    ▼
MongoDB + Email
    │
    │ 10. Notify employee
    ▼
Employee Email
```

---

## 🔐 Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                       │
│                                                          │
│  Layer 1: HTTPS/TLS                                     │
│  ├─ All traffic encrypted                               │
│  └─ SSL certificates (Let's Encrypt)                    │
│                                                          │
│  Layer 2: Authentication                                │
│  ├─ JWT tokens (httpOnly cookies)                       │
│  ├─ Google OAuth 2.0                                    │
│  └─ Password hashing (bcrypt)                           │
│                                                          │
│  Layer 3: Authorization                                 │
│  ├─ Role-based access control                           │
│  ├─ Middleware validation                               │
│  └─ Route protection                                    │
│                                                          │
│  Layer 4: Data Protection                               │
│  ├─ MongoDB encryption at rest                          │
│  ├─ Environment variables                               │
│  └─ Input validation & sanitization                     │
│                                                          │
│  Layer 5: Network Security                              │
│  ├─ CORS configuration                                  │
│  ├─ Rate limiting (optional)                            │
│  └─ IP whitelisting (MongoDB)                           │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Scalability Architecture

### Current Setup (Small Team)
```
Frontend (Static)  ──▶  Backend (1 instance)  ──▶  MongoDB (M0)
   Free/Cheap              $7/month                   Free
   Unlimited users         ~100 concurrent            512MB
```

### Medium Scale (Growing Team)
```
Frontend (CDN)  ──▶  Backend (2-3 instances)  ──▶  MongoDB (M10)
   $0-20/month         $20-40/month                  $57/month
   Unlimited           ~500 concurrent               10GB
```

### Enterprise Scale (Large Organization)
```
                    ┌─ Backend Instance 1 ─┐
Frontend (CDN) ──▶  │  Load Balancer       │ ──▶  MongoDB (M30+)
                    └─ Backend Instance 2+ ─┘      + Replica Set
   $50/month           $100+/month                  $200+/month
   Unlimited           1000+ concurrent             100GB+
```

---

## 🔄 CI/CD Pipeline

```
Developer
    │
    │ git push
    ▼
GitHub Repository
    │
    │ webhook trigger
    ▼
CI/CD Platform (GitHub Actions / Render Auto-Deploy)
    │
    ├─ Run Tests
    ├─ Build Frontend
    ├─ Build Backend
    └─ Deploy
        │
        ├─▶ Frontend → Render/Vercel
        └─▶ Backend → Render/Railway
            │
            ▼
        Production Environment
            │
            ├─ Health Check
            ├─ Smoke Tests
            └─ Notify Team
```

---

## 🗄️ Database Architecture

```
MongoDB Atlas Cluster
│
├─ leave-management (Database)
│   │
│   ├─ users (Collection)
│   │   ├─ _id
│   │   ├─ name
│   │   ├─ email (unique)
│   │   ├─ password (hashed)
│   │   ├─ role (employee/manager/admin)
│   │   ├─ department
│   │   ├─ mobile
│   │   ├─ employeeId
│   │   └─ googleId
│   │
│   ├─ leaves (Collection)
│   │   ├─ _id
│   │   ├─ userId (ref: users)
│   │   ├─ leaveType
│   │   ├─ startDate
│   │   ├─ endDate
│   │   ├─ reason
│   │   ├─ status (pending/approved/rejected)
│   │   └─ approvedBy (ref: users)
│   │
│   ├─ leavepolicies (Collection)
│   │   ├─ _id
│   │   ├─ name
│   │   ├─ days
│   │   └─ description
│   │
│   └─ auditlogs (Collection)
│       ├─ _id
│       ├─ userId (ref: users)
│       ├─ action
│       ├─ details
│       └─ timestamp
│
└─ Indexes
    ├─ users.email (unique)
    ├─ users.employeeId (unique, sparse)
    ├─ leaves.userId
    ├─ leaves.status
    └─ auditlogs.timestamp
```

---

## 🌍 Geographic Distribution

### Single Region (Current)
```
All Users ──▶ Single Server ──▶ Single Database
              (US/EU)            (US/EU)
```

### Multi-Region (Future)
```
US Users ──▶ US Server ──┐
                         ├──▶ Primary Database (US)
EU Users ──▶ EU Server ──┤     ├─ Replica (EU)
                         │     └─ Replica (Asia)
Asia Users ──▶ Asia Server ─┘
```

---

## 📈 Monitoring Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    MONITORING STACK                      │
│                                                          │
│  Application Monitoring                                 │
│  ├─ Render Dashboard (logs, metrics)                    │
│  ├─ MongoDB Atlas (database performance)                │
│  └─ Custom health checks                                │
│                                                          │
│  Uptime Monitoring                                      │
│  ├─ UptimeRobot (free)                                  │
│  ├─ Pingdom (paid)                                      │
│  └─ StatusPage (status.io)                              │
│                                                          │
│  Error Tracking                                         │
│  ├─ Sentry (optional)                                   │
│  ├─ Rollbar (optional)                                  │
│  └─ Custom error logging                                │
│                                                          │
│  Analytics                                              │
│  ├─ Google Analytics (user behavior)                    │
│  ├─ Custom analytics API                                │
│  └─ Usage reports                                       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Backup & Recovery

```
Production Database (MongoDB Atlas)
    │
    ├─ Continuous Backup (Point-in-time)
    │   └─ Retention: 30 days
    │
    ├─ Daily Snapshots
    │   └─ Retention: 7 days
    │
    └─ Weekly Snapshots
        └─ Retention: 4 weeks

Recovery Process:
1. Identify issue
2. Select restore point
3. Create new cluster from backup
4. Verify data integrity
5. Update connection string
6. Switch traffic
7. Monitor recovery
```

---

## 🚀 Deployment Workflow

### Development → Production

```
Local Development
    │
    │ git commit
    ▼
Feature Branch
    │
    │ Pull Request
    ▼
Code Review
    │
    │ Merge to main
    ▼
GitHub Main Branch
    │
    │ Auto-deploy trigger
    ▼
Build & Test
    │
    ├─ npm install
    ├─ npm test
    └─ npm run build
        │
        ▼
    Deploy
        │
        ├─▶ Frontend (Render/Vercel)
        │   └─ Update static files
        │
        └─▶ Backend (Render/Railway)
            └─ Restart service
                │
                ▼
            Health Check
                │
                ├─ API responding?
                ├─ Database connected?
                └─ All services up?
                    │
                    ▼
                Production Live ✅
```

---

## 📊 Performance Optimization

```
┌─────────────────────────────────────────────────────────┐
│                  OPTIMIZATION LAYERS                     │
│                                                          │
│  Frontend Optimization                                  │
│  ├─ Code splitting                                      │
│  ├─ Lazy loading                                        │
│  ├─ Image optimization                                  │
│  ├─ Caching strategies                                  │
│  └─ CDN delivery                                        │
│                                                          │
│  Backend Optimization                                   │
│  ├─ Database indexing                                   │
│  ├─ Query optimization                                  │
│  ├─ Connection pooling                                  │
│  ├─ Response compression                                │
│  └─ Caching (Redis - optional)                          │
│                                                          │
│  Network Optimization                                   │
│  ├─ HTTP/2                                              │
│  ├─ Gzip compression                                    │
│  ├─ Keep-alive connections                              │
│  └─ CDN edge caching                                    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Recommended Architecture (Start Here)

```
┌──────────────────────────────────────────────────────────┐
│              RECOMMENDED SETUP (Render)                   │
│                                                           │
│  Frontend (Static Site)                                  │
│  ├─ Free tier                                            │
│  ├─ Auto HTTPS                                           │
│  ├─ CDN included                                         │
│  └─ Auto-deploy from GitHub                              │
│                                                           │
│  Backend (Web Service)                                   │
│  ├─ $7/month (always-on)                                 │
│  ├─ Auto HTTPS                                           │
│  ├─ Health checks                                        │
│  └─ Auto-deploy from GitHub                              │
│                                                           │
│  Database (MongoDB Atlas)                                │
│  ├─ M0 Free tier (start)                                 │
│  ├─ Upgrade to M10 ($57/month) for production            │
│  ├─ Automatic backups                                    │
│  └─ Global distribution                                  │
│                                                           │
│  Total Cost: $7/month (testing) or $64/month (prod)     │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

---

## 📞 Next Steps

1. **Review**: [QUICK_DEPLOY.md](QUICK_DEPLOY.md)
2. **Deploy**: Follow 15-minute guide
3. **Test**: Verify all features
4. **Monitor**: Set up uptime monitoring
5. **Scale**: Upgrade as needed

---

**Your architecture is ready for deployment!** 🚀
