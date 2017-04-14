# Memento
This repository is created to share the code in development for my own web service.

[http://sample-env.vhzmgeeasq.ap-northeast-1.elasticbeanstalk.com/](http://sample-env.vhzmgeeasq.ap-northeast-1.elasticbeanstalk.com/)

**Please note that some required security crendentials are not revealed in this respository so it will never run on the production mode as it is.**

## Technical stack
### Infrastructure
* AWS
* Docker (v1.11.1)

```
docker-compose up # For local development
```

### Backend
* Ruby on Rails (v4.2.6)
* PostgreSQL

### Frontend
* Babel (v6.5.2)
* Webpack (v1.13.3)
* React.js (v15.2.1)
* Redux (v3.6.0)
* Bootstrap (v3.3.7)

```
cd frontend
npm run build # Compile for development
npm run watch # Wait for code changed and build
npm run release # Compile for production
```
