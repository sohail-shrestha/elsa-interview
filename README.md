# Real-Time Vocabulary Quiz Coding Challenge

This project is the interview assignment for ELSA Courp. 

# Setting up the project.

Setting up the backend is fairly straightforward. Run the following `cd services && docker compose up -d` and you should have your back end running with the database. For setting up the front end, as I do not have a docker set up for this, run `cd front-end && npm install && npm run dev`.


# System Design
Here's an overview of a system design for the coding challenge. 
![elsa-quiz drawio](https://github.com/sohail-shrestha/elsa-interview/assets/86829720/ca5bf31e-9421-4452-90a4-cb6ce1a3498e).

Below is a brief description of what each of the components is responsible for.
1. **Client:** This is the front-end. This might be web and/or mobile. The client would access the services via a proxy. The client would communicate to a separate server for messaging. In this case, the messaging server would be updating the leaderboard in real-time.
2. **Proxy:** Proxy is for sending traffic from the client to one of the microservices based on the path. Proxy is required here to solve the problem of reliability. When we have a new version of a service, and it doesn't work as expected, we can quickly route the traffic to the old service that was working. It also helps in scalability as we can double a proxy as a load balancer.
3. **Services(User Service, Quiz Service, Score Service, Leaderboard Service):** As the name suggests, user microservice would be used to handle users, quiz to handle quiz questions, score service to handle scores, and leaderboard service to handle leaderboard. 
A single database microservice architecture is implemented here. This is primarily done for scalability, performance, reliability, and maintainability.
4. **Event Bus:** Event bus here, is primarily for capturing events such as when a quiz has been submitted. Score service and leaderboard service are subscribed to it and make changes to score and leaderboard are accordingly.
5. **Sidecars:** Score service and Leaderboard service follow a sidecar pattern as these services for monitoring scores and leaderboard which would change from time to time. We have another service, a messaging service, which subscribes to the event bus. Every time there are changes in the leadership board, the messaging service would send a message to the client with regards to the updated leaderboard.

# Build for the future:
1. **Scaleability and Performance:** For scalability, Kubernetes would be implemented, as it would make it fairly straightforward for horizontal scaling. In terms of algorithm, besides code optimization and database query optimization, we could partition the database based on quiz ID for Score Service and Leaderboard Service, as a large number of quiz submissions would result in growing data for score and leadership.
2. **Reliability:** We would need to add a database validation cronjob for data consistency. However, for reliability, we would depend on Kubernete's Pod Restart Policy.
3. **Maintainability:** Since the microservices are small, we would have better maintainability and ease of refactoring without affecting other modules, even in cases where some of the services have bad code.
4. **Monitoring and Observability:** For monitoring and observability, we would be adding a data dog agent as a sidecar.

While I acknowledge that the current state of the repository may not fully meet the acceptance criteria, I want to emphasize that I dedicated significant effort to establishing a robust architecture for the application. Thank you for taking the time to review this documentation. I appreciate your insights and guidance. Have a wonderful day.
