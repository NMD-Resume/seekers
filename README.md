# We-Got-This / SeekHunt Resume Builder

# Overview

An online resume building tool for software developers. Think of it as a combination of linkedIn with Codepen + gitHub.

## Getting Started
- Install dependencies: `npm install`

- To Start initial build with Webpack do: `npm run webpack`

- Next do `npm start` and navigate in your browser to [localhost:3000](http://localhost:3000/) to see your built application.

## Core Features: Front-End

- [x] React-native form for resume information input

- [x] HTML based login/signup page

- [x] React-native output of online resume

- [x] Beautiful project with CSS, Material Design and React-Bootstrap

- [ ] Adding iframe for portfolio

## Core Features: Back-End

- [x] Database for authentication, job seeker, job hunter

- [x] Setting up CRUD and data handling

- [x] Routing files for authentication

- [x] Routing connecting front-end with back-end

- [ ] Database for image storage

## Stretch Goals

Here are some further development ideas we researched but were not able to implement on time.

- [ ] Add private DM chat with socket.io

- [ ] Create a digital business card that a job seeker can send to employer

- [ ] Allowing employer to accept or reject job seeker (and vice versa)

- [ ] Matching algorithm to match potential job posting with job seekers

- [ ] Database for image storage

## Some notes

- A wonderful video about how to create private messaging with socket.io: https://www.youtube.com/watch?v=k8o8-Q_-Qfk

- Regarding the algorithm for matching, try using parallel priority queue (per suggestion from Will Barnes) to make your matching smart. Meaning that if an employer rejects you, in the future, you will receive less notifications from job posting of the same type.

- Suggestions from canvas for image storage is to load it into canvas and canvas has a built-in function for storing the whole canvas into a database. Per discussion with giferent team, you can also buffer the image into binary code or turn it into a blob (not fully understanding the concept) which can be stored in the database.

## Resources:

https://michaelheap.com/sending-messages-to-certain-clients-with-socket-io/
http://www.tamas.io/advanced-chat-using-node-js-and-socket-io-episode-1/
https://en.wikipedia.org/wiki/Stable_marriage_problem
https://gist.github.com/joyrexus/9967709

### Contact
If you have any questions, slack michaelkhouv, derekmiranda or eveafeline(naomi).
