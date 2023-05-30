### ft_transcendence
# 22.-Inception

## Table of contents
* [Goal](#Goal)  
* [Requirements](#Requirements)
  * [Main](#main)
  * [Security](#Security)
  * [User](#User)
  * [Chat](#Chat)
  * [Game](#Game)

## Goal
This project is about creating a website for the mighty Pong contest!

<img width="576" alt="image" src="https://github.com/Abensett/24.-Ft_transcendence/assets/85625233/f2e80048-6223-4ed2-a38c-930273e81e62">

## Scheme

## Requirements
### Main
• Backend in `NestJS`.  
• Frontend in a `TypeScript framework` of our choice: `ReactJS`.  
• Free to use any library but must be the latest stable version
• Must use PostgreSQL database. No other database.  
• Must be a `single-page application`. The user should be able to use the Back and Forward buttons of the browser.  
• Compatible with the latest stable up-to-date version of Google Chrome (+ Mozilla and Brave).  
• No unhandled errors and no warnings when browsing the website.  
• Everything has to be launch by a single call to: `docker-compose up --build`

### Security
• Any password stored in the database must be `hashed`.  
• Must be `protected against SQL injections`.  
•  `Server-side validation` for `forms` and any `userinput`.  

### User
• User must login using the `OAuth system of 42 intranet`.  
• Name must be `unique` and displayed. 
• User should be able to `upload an avatar` otherwise `default`.  
• The user should be able to enable `two-factor authentication` (**mail** or app).  
• Add other users as `friends` and see their `current status` (online, offline, in a game, and so forth).   
• Stats (such as: wins and losses, ladder level, achievements, and so forth) on User Profile.  
• Match History including 1v1 games, ladder, and anything else useful. Anyone who is logged in should be able to consult it.  

### Chat 
• Create channels : `public, or private, or protected by a password`.  
• Send `direct messages` to other users.  
• `Block` other users.  
◦ The channel owner can `set a password` required to access the channel, `change`
it or `remove` it.  
◦ Add others as administrators.  
◦ Administrator of a channel can `kick, ban or mute` (for alimited time), but not the channel owners.  
• `Invite` other users to play a Pong game through the chat.  
• Access other players profiles through the chat interface.  

### Game
• Play a live Pong game versus another player.  
• `Matchmaking` system.  
• Power-ups.  
• Must be `responsive`!  
 

## 42 Project 100/100
