## 🔧 Pull Request Checklist
_Please update the description, check relevant tasks, and remove any sections that don’t apply to speed up PR approval._


### 🔄 Back-End Code Changes
- [ ] `composer install` (with no errors) if you make a change in dependencies
- [ ] Symfony server launches successfully (`symfony serve`)
- [ ] `.env`, `services.yaml`, or other config changes documented
- [ ] Routes and services work as expected (manual/local test done using Apidog)


### 🛠️ Database Changes
- [ ] New/altered entities are valid (`php bin/console doctrine:schema:validate`)
- [ ] Migration file created and reviewed (`php bin/console make:migration`)
- [ ] Migration tested locally (`php bin/console doctrine:migrations:migrate`)


### 🧩 Related Issues:
- Closes: `#ISSUE-ID`
- Linear link (if any): _add here_


### 🐛 Fix Brief:

_Explain the issue and what this PR changes to resolve it._


### 📸 Screenshots / Proof:

_Include API responses, UI views, console logs, or DB evidence if helpful._