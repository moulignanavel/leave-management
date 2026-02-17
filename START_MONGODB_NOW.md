# ⚡ Start MongoDB NOW - Ultra Simple

## Just follow these clicks:

---

## 1️⃣ Go Here
👉 https://www.mongodb.com/cloud/atlas/register

---

## 2️⃣ Click "Sign up with Google"
(Or use email if you prefer)

---

## 3️⃣ Click "Create" on the FREE option
(The one that says $0/month)

---

## 4️⃣ In the popup that appears:
- Username: `admin`
- Password: `admin123`
- Click "Create User"

---

## 5️⃣ Still in popup:
- Click "Allow Access from Anywhere"
- Click "Finish and Close"

---

## 6️⃣ Click "Connect" button

---

## 7️⃣ Click "Drivers"

---

## 8️⃣ Copy the long text (connection string)

---

## 9️⃣ Open `.env` file in your project

Replace this line:
```
MONGO_URI=mongodb://localhost:27017/leave-management
```

With your copied text, but:
- Change `<password>` to `admin123`
- Add `/leave-management` before the `?`

Should look like:
```
MONGO_URI=mongodb+srv://admin:admin123@cluster0.xxxxx.mongodb.net/leave-management?retryWrites=true&w=majority
```

Save the file!

---

## 🔟 Test it:

```bash
npm run seed
```

See "MongoDB Connected"? **YOU'RE DONE!** ✅

---

## Now run:

```bash
npm run dev
```

Open: http://localhost:3000

Login: admin@test.com / admin123

---

## That's it! 🎉

**Stuck?** Tell me which step and I'll help!

**Want more details?** Read `CONNECT_MONGODB_EASY.md`
