## Introduction

This repo is a skeleton for how to implement a payments system. The problem the system tries to solve is how to allow people to create payment requests on your platform, and for your platform to connect with some local payment rails to facilitate the payment.

This is useful when you want to abstract the local payment rails, especially when multiple can be used to the background, and to give the user an easy way to handle payments.

The system will handle initializing payment requests, updating users on payment status using webhook events and calling a local payments railway to do the payment.

This repo is a skeleton of how such a system could be implemented with Express JS and a Paystack as the payment rail. Feel free to use it as a base for whatever system you are implementing.

## Modules

The payments system is divided into multiple modules that handle different things. Each module works together to perform the functions described above.