# Otium Platform - Complete Backend API Endpoints Documentation

## Table of Contents
1. [Authentication & Registration](#authentication--registration)
2. [User Management (Renters)](#user-management-renters)
3. [Property Owner Management](#property-owner-management)
4. [Admin Management](#admin-management)
5. [Property Management](#property-management)
6. [Booking Management](#booking-management)
7. [Search & Browse](#search--browse)
8. [Reviews & Ratings](#reviews--ratings)
9. [Payment Processing](#payment-processing)
10. [Guest Verification](#guest-verification)
11. [Visitor Requests](#visitor-requests)
12. [Messages & Communication](#messages--communication)
13. [Emergency Alerts](#emergency-alerts)
14. [Checkout System](#checkout-system)
15. [Verification & KYC](#verification--kyc)
16. [Favorites & Wishlist](#favorites--wishlist)
17. [Extension Requests](#extension-requests)
18. [Analytics & Reports](#analytics--reports)
19. [Notifications](#notifications)
20. [Help Center](#help-center)

---

## 1. Authentication & Registration

### POST `/api/auth/register/renter`
Create a new renter account (permanently locked to renter role)
```json
Request: {
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "password": "string",
  "dateOfBirth": "date",
  "address": "string",
  "city": "string",
  "state": "string",
  "country": "string",
  "zipCode": "string",
  "gdprConsent": "boolean",
  "ccpaConsent": "boolean",
  "nigeriaDataProtectionConsent": "boolean"
}
Response: {
  "userId": "string",
  "role": "renter",
  "token": "string",
  "message": "Registration successful. Please verify your email."
}
```

### POST `/api/auth/register/owner`
Create a new property owner account (permanently locked to owner role)
```json
Request: {
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "password": "string",
  "businessType": "individual|registered_business",
  "businessName": "string (optional)",
  "businessRegistrationNumber": "string (optional)",
  "address": "string",
  "city": "string",
  "state": "string",
  "country": "string",
  "gdprConsent": "boolean",
  "ccpaConsent": "boolean",
  "nigeriaDataProtectionConsent": "boolean"
}
Response: {
  "userId": "string",
  "role": "owner",
  "token": "string",
  "status": "pending_approval",
  "message": "Registration submitted. Awaiting admin approval."
}
```

### POST `/api/auth/login`
Login for all user types (renter, owner, admin)
```json
Request: {
  "email": "string",
  "password": "string",
  "userType": "renter|owner|admin"
}
Response: {
  "userId": "string",
  "role": "string",
  "token": "string",
  "verified": "boolean",
  "approvalStatus": "string (for owners)"
}
```

### POST `/api/auth/logout`
Logout current user
```json
Request: {
  "token": "string"
}
Response: {
  "message": "Logged out successfully"
}
```

### POST `/api/auth/forgot-password`
Request password reset
```json
Request: {
  "email": "string"
}
Response: {
  "message": "Password reset link sent to email"
}
```

### POST `/api/auth/reset-password`
Reset password with token
```json
Request: {
  "token": "string",
  "newPassword": "string"
}
Response: {
  "message": "Password reset successful"
}
```

### POST `/api/auth/verify-email`
Verify email address
```json
Request: {
  "token": "string"
}
Response: {
  "message": "Email verified successfully"
}
```

### POST `/api/auth/resend-verification`
Resend verification email
```json
Request: {
  "email": "string"
}
Response: {
  "message": "Verification email sent"
}
```

---

## 2. User Management (Renters)

### GET `/api/renters/profile`
Get current renter profile
```json
Response: {
  "userId": "string",
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "avatar": "string",
  "dateOfBirth": "date",
  "address": "object",
  "verificationStatus": "object",
  "profileCompletion": "number",
  "joinedDate": "date",
  "totalBookings": "number",
  "reviewCount": "number",
  "averageRating": "number"
}
```

### PUT `/api/renters/profile`
Update renter profile
```json
Request: {
  "fullName": "string",
  "phone": "string",
  "avatar": "string",
  "address": "object",
  "bio": "string"
}
Response: {
  "message": "Profile updated successfully",
  "profile": "object"
}
```

### GET `/api/renters/dashboard/stats`
Get renter dashboard statistics
```json
Response: {
  "upcomingTrips": "number",
  "totalReviews": "number",
  "savedProperties": "number",
  "verificationStatus": "object",
  "profileCompletion": "number"
}
```

### DELETE `/api/renters/account`
Delete renter account (GDPR compliance)
```json
Request: {
  "password": "string",
  "reason": "string"
}
Response: {
  "message": "Account deleted successfully"
}
```

### GET `/api/renters/data-export`
Export all user data (GDPR compliance)
```json
Response: {
  "userData": "object",
  "bookings": "array",
  "reviews": "array",
  "messages": "array",
  "downloadUrl": "string"
}
```

---

## 3. Property Owner Management

### GET `/api/owners/profile`
Get property owner profile
```json
Response: {
  "userId": "string",
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "businessType": "string",
  "businessName": "string",
  "verificationStatus": "string",
  "approvalStatus": "pending|approved|rejected",
  "totalProperties": "number",
  "totalBookings": "number",
  "totalRevenue": "number",
  "averageRating": "number",
  "responseTime": "string",
  "joinedDate": "date"
}
```

### PUT `/api/owners/profile`
Update property owner profile
```json
Request: {
  "fullName": "string",
  "phone": "string",
  "avatar": "string",
  "businessName": "string",
  "bio": "string",
  "languages": "array"
}
Response: {
  "message": "Profile updated successfully"
}
```

### GET `/api/owners/dashboard/stats`
Get owner dashboard statistics
```json
Response: {
  "totalProperties": "number",
  "activeBookings": "number",
  "monthlyRevenue": "number",
  "pendingCheckouts": "number",
  "emergencyAlerts": "number",
  "bookingRequests": "number",
  "occupancyRate": "number",
  "averageRating": "number"
}
```

### GET `/api/owners/dashboard/revenue`
Get revenue analytics data
```json
Query: {
  "period": "week|month|year",
  "startDate": "date",
  "endDate": "date"
}
Response: {
  "revenueData": "array",
  "totalRevenue": "number",
  "growthPercentage": "number"
}
```

### GET `/api/owners/pending-approvals`
Get list of owners pending admin approval
```json
Response: {
  "owners": [{
    "ownerId": "string",
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "businessType": "string",
    "submittedDate": "date",
    "documents": "array"
  }]
}
```

---

## 4. Admin Management

### GET `/api/admin/dashboard/stats`
Get admin dashboard overview statistics
```json
Response: {
  "totalPropertyOwners": "number",
  "pendingOwners": "number",
  "totalRenters": "number",
  "totalProperties": "number",
  "activeProperties": "number",
  "pendingGuestApprovals": "number",
  "emergencyAlerts": "number",
  "platformRevenue": "number"
}
```

### GET `/api/admin/owners/pending`
Get pending property owner approvals
```json
Response: {
  "owners": "array"
}
```

### POST `/api/admin/owners/:ownerId/approve`
Approve property owner registration
```json
Request: {
  "notes": "string"
}
Response: {
  "message": "Owner approved successfully"
}
```

### POST `/api/admin/owners/:ownerId/reject`
Reject property owner registration
```json
Request: {
  "reason": "string"
}
Response: {
  "message": "Owner rejected"
}
```

### GET `/api/admin/renters`
Get all renters with filters
```json
Query: {
  "status": "active|suspended",
  "verified": "boolean",
  "page": "number",
  "limit": "number",
  "search": "string"
}
Response: {
  "renters": "array",
  "total": "number",
  "page": "number",
  "totalPages": "number"
}
```

### POST `/api/admin/users/:userId/suspend`
Suspend user account
```json
Request: {
  "reason": "string",
  "duration": "number (days)"
}
Response: {
  "message": "User suspended successfully"
}
```

### POST `/api/admin/users/:userId/unsuspend`
Unsuspend user account
```json
Response: {
  "message": "User unsuspended successfully"
}
```

### POST `/api/admin/users/:userId/flag`
Flag user for review
```json
Request: {
  "reason": "string",
  "severity": "low|medium|high",
  "description": "string"
}
Response: {
  "message": "User flagged successfully"
}
```

---

## 5. Property Management

### POST `/api/properties`
Create new property listing
```json
Request: {
  "title": "string",
  "description": "string",
  "propertyType": "apartment|house|villa|studio",
  "address": "object",
  "coordinates": "object",
  "bedrooms": "number",
  "bathrooms": "number",
  "maxGuests": "number",
  "pricePerNight": "number",
  "amenities": "array",
  "houseRules": "array",
  "images": "array",
  "availabilityCalendar": "array",
  "instantBooking": "boolean",
  "minimumStay": "number",
  "maximumStay": "number"
}
Response: {
  "propertyId": "string",
  "status": "pending_verification",
  "message": "Property listing created successfully"
}
```

### GET `/api/properties/:propertyId`
Get property details
```json
Response: {
  "propertyId": "string",
  "title": "string",
  "description": "string",
  "owner": "object",
  "location": "object",
  "pricing": "object",
  "amenities": "array",
  "images": "array",
  "reviews": "array",
  "averageRating": "number",
  "availability": "array",
  "houseRules": "array",
  "verificationStatus": "string"
}
```

### PUT `/api/properties/:propertyId`
Update property listing
```json
Request: {
  "title": "string",
  "description": "string",
  "pricePerNight": "number",
  "amenities": "array",
  "houseRules": "array",
  "images": "array"
}
Response: {
  "message": "Property updated successfully"
}
```

### DELETE `/api/properties/:propertyId`
Delete property listing
```json
Response: {
  "message": "Property deleted successfully"
}
```

### GET `/api/properties/owner/:ownerId`
Get all properties by owner
```json
Query: {
  "status": "active|inactive|pending",
  "page": "number",
  "limit": "number"
}
Response: {
  "properties": "array",
  "total": "number"
}
```

### PUT `/api/properties/:propertyId/status`
Update property status
```json
Request: {
  "status": "active|inactive|suspended"
}
Response: {
  "message": "Property status updated"
}
```

### GET `/api/properties/:propertyId/analytics`
Get property analytics
```json
Query: {
  "period": "week|month|year"
}
Response: {
  "views": "number",
  "bookings": "number",
  "revenue": "number",
  "occupancyRate": "number",
  "averageStayDuration": "number",
  "topMonths": "array"
}
```

### PUT `/api/properties/:propertyId/availability`
Update property availability calendar
```json
Request: {
  "dates": [{
    "date": "date",
    "available": "boolean",
    "price": "number (optional)"
  }]
}
Response: {
  "message": "Availability updated successfully"
}
```

---

## 6. Booking Management

### POST `/api/bookings`
Create new booking
```json
Request: {
  "propertyId": "string",
  "checkInDate": "date",
  "checkOutDate": "date",
  "numberOfGuests": "number",
  "totalPrice": "number",
  "paymentMethod": "string",
  "specialRequests": "string"
}
Response: {
  "bookingId": "string",
  "status": "pending|confirmed",
  "paymentRequired": "boolean",
  "message": "Booking created successfully"
}
```

### GET `/api/bookings/:bookingId`
Get booking details
```json
Response: {
  "bookingId": "string",
  "property": "object",
  "renter": "object",
  "owner": "object",
  "checkInDate": "date",
  "checkOutDate": "date",
  "numberOfGuests": "number",
  "totalPrice": "number",
  "status": "string",
  "paymentStatus": "string",
  "createdAt": "date"
}
```

### GET `/api/bookings/renter/:renterId`
Get all bookings for renter
```json
Query: {
  "status": "upcoming|active|completed|cancelled",
  "page": "number",
  "limit": "number"
}
Response: {
  "bookings": "array",
  "total": "number"
}
```

### GET `/api/bookings/owner/:ownerId`
Get all bookings for property owner
```json
Query: {
  "status": "pending|confirmed|active|completed|cancelled",
  "propertyId": "string (optional)",
  "page": "number",
  "limit": "number"
}
Response: {
  "bookings": "array",
  "total": "number"
}
```

### PUT `/api/bookings/:bookingId/status`
Update booking status
```json
Request: {
  "status": "confirmed|cancelled|completed",
  "reason": "string (for cancellation)"
}
Response: {
  "message": "Booking status updated"
}
```

### POST `/api/bookings/:bookingId/cancel`
Cancel booking
```json
Request: {
  "reason": "string",
  "cancelledBy": "renter|owner|admin"
}
Response: {
  "message": "Booking cancelled",
  "refundAmount": "number",
  "cancellationFee": "number"
}
```

### GET `/api/bookings/:bookingId/invoice`
Get booking invoice
```json
Response: {
  "invoiceId": "string",
  "bookingId": "string",
  "lineItems": "array",
  "subtotal": "number",
  "taxes": "number",
  "fees": "number",
  "total": "number",
  "pdfUrl": "string"
}
```

---

## 7. Search & Browse

### GET `/api/properties/search`
Search properties with filters
```json
Query: {
  "location": "string",
  "checkIn": "date",
  "checkOut": "date",
  "guests": "number",
  "minPrice": "number",
  "maxPrice": "number",
  "propertyType": "string",
  "bedrooms": "number",
  "bathrooms": "number",
  "amenities": "array",
  "instantBooking": "boolean",
  "sortBy": "price|rating|distance",
  "page": "number",
  "limit": "number"
}
Response: {
  "properties": "array",
  "total": "number",
  "page": "number",
  "totalPages": "number",
  "filters": "object"
}
```

### GET `/api/properties/browse`
Browse all properties
```json
Query: {
  "category": "trending|new|recommended",
  "page": "number",
  "limit": "number"
}
Response: {
  "properties": "array",
  "total": "number"
}
```

### GET `/api/properties/recommendations/:userId`
Get personalized property recommendations
```json
Response: {
  "recommendations": "array"
}
```

### GET `/api/properties/nearby`
Get properties nearby a location
```json
Query: {
  "latitude": "number",
  "longitude": "number",
  "radius": "number (km)",
  "limit": "number"
}
Response: {
  "properties": "array"
}
```

---

## 8. Reviews & Ratings

### POST `/api/reviews`
Create review (renter reviews property/owner OR owner reviews renter)
```json
Request: {
  "bookingId": "string",
  "reviewType": "property|renter",
  "overallRating": "number (1-5)",
  "cleanlinessRating": "number (for properties)",
  "communicationRating": "number",
  "accuracyRating": "number (for properties)",
  "valueRating": "number (for properties)",
  "respectRating": "number (for renters)",
  "reviewText": "string",
  "wouldRecommend": "boolean",
  "privateNotes": "string (owner only)"
}
Response: {
  "reviewId": "string",
  "message": "Review submitted successfully"
}
```

### GET `/api/reviews/property/:propertyId`
Get all reviews for a property
```json
Query: {
  "page": "number",
  "limit": "number",
  "sortBy": "recent|rating"
}
Response: {
  "reviews": "array",
  "averageRating": "number",
  "ratingDistribution": "object",
  "total": "number"
}
```

### GET `/api/reviews/renter/:renterId`
Get reviews for a renter (visible to owners)
```json
Response: {
  "reviews": "array",
  "averageRating": "number",
  "totalReviews": "number"
}
```

### GET `/api/reviews/owner/:ownerId`
Get reviews for an owner
```json
Response: {
  "reviews": "array",
  "averageRating": "number",
  "totalReviews": "number"
}
```

### PUT `/api/reviews/:reviewId`
Update review
```json
Request: {
  "overallRating": "number",
  "reviewText": "string"
}
Response: {
  "message": "Review updated successfully"
}
```

### DELETE `/api/reviews/:reviewId`
Delete review (within 24 hours)
```json
Response: {
  "message": "Review deleted successfully"
}
```

### POST `/api/reviews/:reviewId/report`
Report inappropriate review
```json
Request: {
  "reason": "string"
}
Response: {
  "message": "Review reported for moderation"
}
```

---

## 9. Payment Processing

### POST `/api/payments/initialize`
Initialize payment
```json
Request: {
  "bookingId": "string",
  "amount": "number",
  "paymentMethod": "paystack|flutterwave|bank_transfer",
  "currency": "NGN|USD"
}
Response: {
  "paymentId": "string",
  "paymentUrl": "string",
  "reference": "string"
}
```

### POST `/api/payments/verify`
Verify payment
```json
Request: {
  "reference": "string",
  "paymentId": "string"
}
Response: {
  "status": "success|failed",
  "bookingId": "string",
  "message": "string"
}
```

### GET `/api/payments/:paymentId`
Get payment details
```json
Response: {
  "paymentId": "string",
  "bookingId": "string",
  "amount": "number",
  "currency": "string",
  "status": "pending|completed|failed|refunded",
  "paymentMethod": "string",
  "transactionDate": "date"
}
```

### POST `/api/payments/:paymentId/refund`
Process refund
```json
Request: {
  "amount": "number",
  "reason": "string"
}
Response: {
  "refundId": "string",
  "status": "processing",
  "estimatedDate": "date"
}
```

### GET `/api/payments/renter/:renterId`
Get renter payment history
```json
Query: {
  "page": "number",
  "limit": "number"
}
Response: {
  "payments": "array",
  "total": "number"
}
```

### GET `/api/payments/owner/:ownerId/earnings`
Get owner earnings
```json
Query: {
  "startDate": "date",
  "endDate": "date"
}
Response: {
  "totalEarnings": "number",
  "pendingPayouts": "number",
  "completedPayouts": "number",
  "transactions": "array"
}
```

### POST `/api/payments/payout`
Request payout (owner withdraws earnings)
```json
Request: {
  "amount": "number",
  "bankAccount": "object"
}
Response: {
  "payoutId": "string",
  "status": "processing",
  "estimatedDate": "date"
}
```

---

## 10. Guest Verification

### POST `/api/guest-verification`
Submit guest for verification (renter adds additional guests)
```json
Request: {
  "bookingId": "string",
  "guestName": "string",
  "guestEmail": "string",
  "guestPhone": "string",
  "relationship": "string",
  "idDocument": "string",
  "idNumber": "string"
}
Response: {
  "verificationId": "string",
  "status": "pending_host_approval",
  "message": "Guest verification submitted"
}
```

### GET `/api/guest-verification/booking/:bookingId`
Get guest verifications for a booking
```json
Response: {
  "guests": "array",
  "mainGuest": "object"
}
```

### GET `/api/guest-verification/pending/:ownerId`
Get pending guest verifications for owner
```json
Response: {
  "pendingGuests": "array"
}
```

### PUT `/api/guest-verification/:verificationId/approve`
Approve guest (by owner)
```json
Response: {
  "message": "Guest approved"
}
```

### PUT `/api/guest-verification/:verificationId/reject`
Reject guest (by owner)
```json
Request: {
  "reason": "string"
}
Response: {
  "message": "Guest rejected"
}
```

### POST `/api/guest-verification/:verificationId/check-in`
Record guest check-in
```json
Request: {
  "checkInTime": "datetime",
  "notes": "string"
}
Response: {
  "message": "Guest checked in"
}
```

### POST `/api/guest-verification/:verificationId/check-out`
Record guest check-out
```json
Request: {
  "checkOutTime": "datetime",
  "notes": "string"
}
Response: {
  "message": "Guest checked out"
}
```

---

## 11. Visitor Requests

### POST `/api/visitor-requests`
Create visitor request (renter requests visitor access)
```json
Request: {
  "bookingId": "string",
  "visitorName": "string",
  "visitorPhone": "string",
  "purpose": "string",
  "visitDate": "date",
  "visitTime": "string",
  "duration": "string"
}
Response: {
  "visitorRequestId": "string",
  "status": "pending_approval",
  "message": "Visitor request submitted"
}
```

### GET `/api/visitor-requests/renter/:renterId`
Get visitor requests by renter
```json
Response: {
  "visitorRequests": "array"
}
```

### GET `/api/visitor-requests/owner/:ownerId`
Get visitor requests for owner's properties
```json
Query: {
  "status": "pending|approved|rejected"
}
Response: {
  "visitorRequests": "array"
}
```

### PUT `/api/visitor-requests/:requestId/approve`
Approve visitor request (by owner)
```json
Response: {
  "message": "Visitor approved"
}
```

### PUT `/api/visitor-requests/:requestId/reject`
Reject visitor request (by owner)
```json
Request: {
  "reason": "string"
}
Response: {
  "message": "Visitor request rejected"
}
```

---

## 12. Messages & Communication

### POST `/api/messages`
Send message
```json
Request: {
  "recipientId": "string",
  "bookingId": "string (optional)",
  "subject": "string",
  "message": "string",
  "attachments": "array"
}
Response: {
  "messageId": "string",
  "sentAt": "datetime"
}
```

### GET `/api/messages/conversations`
Get all conversations for user
```json
Response: {
  "conversations": [{
    "conversationId": "string",
    "participants": "array",
    "lastMessage": "object",
    "unreadCount": "number",
    "bookingId": "string (optional)"
  }]
}
```

### GET `/api/messages/conversation/:conversationId`
Get messages in a conversation
```json
Query: {
  "page": "number",
  "limit": "number"
}
Response: {
  "messages": "array",
  "total": "number"
}
```

### PUT `/api/messages/:messageId/read`
Mark message as read
```json
Response: {
  "message": "Message marked as read"
}
```

### GET `/api/messages/unread-count`
Get unread message count
```json
Response: {
  "unreadCount": "number"
}
```

---

## 13. Emergency Alerts

### POST `/api/emergency-alerts`
Create emergency alert (renter reports emergency)
```json
Request: {
  "bookingId": "string",
  "emergencyType": "medical|safety|panic|fire|break_in|utility|other",
  "severity": "low|medium|high",
  "location": "string",
  "details": "string",
  "contactNumber": "string"
}
Response: {
  "alertId": "string",
  "status": "active",
  "notificationsSent": "object",
  "message": "Emergency alert sent to property owner and admin"
}
```

### GET `/api/emergency-alerts/active`
Get all active emergency alerts (admin/owner)
```json
Query: {
  "role": "admin|owner",
  "userId": "string"
}
Response: {
  "alerts": "array"
}
```

### GET `/api/emergency-alerts/:alertId`
Get emergency alert details
```json
Response: {
  "alertId": "string",
  "renter": "object",
  "property": "object",
  "owner": "object",
  "emergencyType": "string",
  "severity": "string",
  "details": "string",
  "location": "string",
  "status": "active|acknowledged|resolved",
  "createdAt": "datetime",
  "acknowledgedAt": "datetime",
  "resolvedAt": "datetime"
}
```

### PUT `/api/emergency-alerts/:alertId/acknowledge`
Acknowledge emergency alert (owner/admin)
```json
Request: {
  "acknowledgedBy": "string",
  "notes": "string"
}
Response: {
  "message": "Emergency alert acknowledged"
}
```

### PUT `/api/emergency-alerts/:alertId/resolve`
Resolve emergency alert (owner/admin)
```json
Request: {
  "resolvedBy": "string",
  "resolution": "string",
  "actionsTaken": "string"
}
Response: {
  "message": "Emergency alert resolved"
}
```

### GET `/api/emergency-alerts/history/:bookingId`
Get emergency alert history for a booking
```json
Response: {
  "alerts": "array"
}
```

---

## 14. Checkout System

### POST `/api/checkouts/initiate`
Initiate checkout (renter initiates)
```json
Request: {
  "bookingId": "string",
  "actualCheckOutDate": "date",
  "actualCheckOutTime": "time",
  "propertyCondition": "string",
  "damages": "array",
  "notes": "string"
}
Response: {
  "checkoutId": "string",
  "status": "pending_owner_confirmation",
  "reviewRequired": "boolean",
  "message": "Checkout initiated. Please complete review before proceeding."
}
```

### GET `/api/checkouts/:checkoutId`
Get checkout details
```json
Response: {
  "checkoutId": "string",
  "bookingId": "string",
  "renter": "object",
  "property": "object",
  "scheduledCheckOut": "datetime",
  "actualCheckOut": "datetime",
  "status": "pending|confirmed|overdue",
  "penalty": "number",
  "reviewCompleted": "boolean",
  "ownerConfirmed": "boolean"
}
```

### PUT `/api/checkouts/:checkoutId/confirm`
Confirm checkout (owner confirms)
```json
Request: {
  "propertyCondition": "excellent|good|fair|poor",
  "damagesFound": "array",
  "cleaningRequired": "boolean",
  "deductions": "array",
  "notes": "string"
}
Response: {
  "message": "Checkout confirmed",
  "finalAmount": "number",
  "deductions": "number",
  "securityDepositRefund": "number"
}
```

### GET `/api/checkouts/pending/:ownerId`
Get pending checkouts for owner
```json
Response: {
  "pendingCheckouts": "array"
}
```

### POST `/api/checkouts/:checkoutId/apply-penalty`
Apply late checkout penalty
```json
Request: {
  "daysLate": "number",
  "penaltyAmount": "number",
  "reason": "string"
}
Response: {
  "message": "Penalty applied",
  "totalPenalty": "number"
}
```

### GET `/api/checkouts/renter/:renterId`
Get checkout history for renter
```json
Response: {
  "checkouts": "array"
}
```

---

## 15. Verification & KYC

### POST `/api/verification/identity`
Upload identity document
```json
Request: {
  "documentType": "national_id|passport|drivers_license",
  "documentNumber": "string",
  "frontImage": "string (base64)",
  "backImage": "string (base64)",
  "expiryDate": "date"
}
Response: {
  "verificationId": "string",
  "status": "pending",
  "message": "Document submitted for verification"
}
```

### POST `/api/verification/address`
Upload address verification document
```json
Request: {
  "documentType": "utility_bill|bank_statement|lease_agreement",
  "document": "string (base64)",
  "issueDate": "date"
}
Response: {
  "verificationId": "string",
  "status": "pending"
}
```

### POST `/api/verification/phone`
Verify phone number
```json
Request: {
  "phoneNumber": "string"
}
Response: {
  "verificationCode": "string",
  "message": "Verification code sent via SMS"
}
```

### POST `/api/verification/phone/confirm`
Confirm phone verification code
```json
Request: {
  "phoneNumber": "string",
  "code": "string"
}
Response: {
  "verified": "boolean",
  "message": "Phone number verified"
}
```

### GET `/api/verification/status/:userId`
Get verification status
```json
Response: {
  "identityVerified": "boolean",
  "addressVerified": "boolean",
  "phoneVerified": "boolean",
  "emailVerified": "boolean",
  "profileCompletion": "number",
  "pendingDocuments": "array"
}
```

### PUT `/api/verification/:verificationId/approve`
Approve verification (admin only)
```json
Response: {
  "message": "Verification approved"
}
```

### PUT `/api/verification/:verificationId/reject`
Reject verification (admin only)
```json
Request: {
  "reason": "string"
}
Response: {
  "message": "Verification rejected"
}
```

---

## 16. Favorites & Wishlist

### POST `/api/favorites`
Add property to favorites
```json
Request: {
  "propertyId": "string"
}
Response: {
  "message": "Property added to favorites"
}
```

### DELETE `/api/favorites/:propertyId`
Remove property from favorites
```json
Response: {
  "message": "Property removed from favorites"
}
```

### GET `/api/favorites/:userId`
Get user's favorite properties
```json
Response: {
  "favorites": "array"
}
```

### POST `/api/wishlists`
Create wishlist
```json
Request: {
  "name": "string",
  "description": "string",
  "propertyIds": "array"
}
Response: {
  "wishlistId": "string",
  "message": "Wishlist created"
}
```

### GET `/api/wishlists/:userId`
Get user's wishlists
```json
Response: {
  "wishlists": "array"
}
```

---

## 17. Extension Requests

### POST `/api/extension-requests`
Request booking extension
```json
Request: {
  "bookingId": "string",
  "newCheckOutDate": "date",
  "reason": "string",
  "additionalGuests": "number (optional)"
}
Response: {
  "extensionRequestId": "string",
  "status": "pending",
  "additionalCost": "number",
  "message": "Extension request submitted"
}
```

### GET `/api/extension-requests/booking/:bookingId`
Get extension requests for booking
```json
Response: {
  "requests": "array"
}
```

### GET `/api/extension-requests/owner/:ownerId`
Get extension requests for owner
```json
Query: {
  "status": "pending|approved|rejected"
}
Response: {
  "requests": "array"
}
```

### PUT `/api/extension-requests/:requestId/approve`
Approve extension request (owner)
```json
Request: {
  "additionalCharge": "number",
  "notes": "string"
}
Response: {
  "message": "Extension approved",
  "newCheckOutDate": "date",
  "totalAdditionalCost": "number"
}
```

### PUT `/api/extension-requests/:requestId/reject`
Reject extension request (owner)
```json
Request: {
  "reason": "string"
}
Response: {
  "message": "Extension request rejected"
}
```

---

## 18. Analytics & Reports

### GET `/api/analytics/owner/:ownerId/overview`
Get owner analytics overview
```json
Query: {
  "period": "week|month|quarter|year",
  "startDate": "date",
  "endDate": "date"
}
Response: {
  "totalRevenue": "number",
  "totalBookings": "number",
  "occupancyRate": "number",
  "averageRating": "number",
  "revenueGrowth": "number",
  "topProperties": "array",
  "revenueByMonth": "array"
}
```

### GET `/api/analytics/property/:propertyId`
Get property-specific analytics
```json
Query: {
  "period": "week|month|year"
}
Response: {
  "views": "number",
  "bookings": "number",
  "revenue": "number",
  "occupancyRate": "number",
  "averageRating": "number",
  "conversionRate": "number"
}
```

### GET `/api/analytics/admin/platform`
Get platform-wide analytics (admin only)
```json
Query: {
  "period": "week|month|quarter|year"
}
Response: {
  "totalUsers": "number",
  "totalProperties": "number",
  "totalBookings": "number",
  "totalRevenue": "number",
  "platformFees": "number",
  "growthMetrics": "object",
  "userAcquisition": "array",
  "popularLocations": "array"
}
```

### GET `/api/reports/owner/:ownerId/revenue`
Generate revenue report for owner
```json
Query: {
  "startDate": "date",
  "endDate": "date",
  "format": "pdf|csv|excel"
}
Response: {
  "reportUrl": "string",
  "totalRevenue": "number",
  "breakdown": "object"
}
```

### GET `/api/reports/admin/tax`
Generate tax report (admin)
```json
Query: {
  "year": "number",
  "format": "pdf|csv"
}
Response: {
  "reportUrl": "string"
}
```

---

## 19. Notifications

### GET `/api/notifications/:userId`
Get user notifications
```json
Query: {
  "type": "all|booking|message|alert|system",
  "status": "all|read|unread",
  "page": "number",
  "limit": "number"
}
Response: {
  "notifications": "array",
  "unreadCount": "number",
  "total": "number"
}
```

### PUT `/api/notifications/:notificationId/read`
Mark notification as read
```json
Response: {
  "message": "Notification marked as read"
}
```

### PUT `/api/notifications/read-all`
Mark all notifications as read
```json
Response: {
  "message": "All notifications marked as read"
}
```

### PUT `/api/notifications/settings`
Update notification preferences
```json
Request: {
  "emailNotifications": "boolean",
  "smsNotifications": "boolean",
  "pushNotifications": "boolean",
  "bookingAlerts": "boolean",
  "messageAlerts": "boolean",
  "emergencyAlerts": "boolean",
  "marketingEmails": "boolean"
}
Response: {
  "message": "Notification preferences updated"
}
```

### POST `/api/notifications/test`
Send test notification
```json
Request: {
  "type": "email|sms|push",
  "userId": "string"
}
Response: {
  "message": "Test notification sent"
}
```

---

## 20. Help Center

### GET `/api/help/categories`
Get help center categories
```json
Response: {
  "categories": [{
    "categoryId": "string",
    "name": "string",
    "icon": "string",
    "articleCount": "number"
  }]
}
```

### GET `/api/help/articles`
Get help articles
```json
Query: {
  "categoryId": "string",
  "search": "string",
  "page": "number",
  "limit": "number"
}
Response: {
  "articles": "array",
  "total": "number"
}
```

### GET `/api/help/articles/:articleId`
Get specific help article
```json
Response: {
  "articleId": "string",
  "title": "string",
  "content": "string",
  "category": "string",
  "helpful": "number",
  "views": "number",
  "lastUpdated": "date"
}
```

### POST `/api/help/articles/:articleId/feedback`
Submit article feedback
```json
Request: {
  "helpful": "boolean",
  "comment": "string (optional)"
}
Response: {
  "message": "Feedback submitted"
}
```

### POST `/api/support/tickets`
Create support ticket
```json
Request: {
  "subject": "string",
  "category": "string",
  "priority": "low|medium|high",
  "description": "string",
  "attachments": "array"
}
Response: {
  "ticketId": "string",
  "status": "open",
  "message": "Support ticket created"
}
```

### GET `/api/support/tickets/:userId`
Get user's support tickets
```json
Query: {
  "status": "open|in_progress|resolved|closed"
}
Response: {
  "tickets": "array"
}
```

---

## Additional Endpoints

### GET `/api/health`
Health check endpoint
```json
Response: {
  "status": "ok",
  "timestamp": "datetime",
  "version": "string"
}
```

### GET `/api/config`
Get public configuration
```json
Response: {
  "supportedCurrencies": "array",
  "supportedLanguages": "array",
  "paymentMethods": "array",
  "maxUploadSize": "number",
  "termsVersion": "string",
  "privacyPolicyVersion": "string"
}
```

### POST `/api/webhooks/paystack`
Paystack webhook
```json
Request: {
  "event": "string",
  "data": "object"
}
Response: {
  "status": "success"
}
```

### POST `/api/webhooks/flutterwave`
Flutterwave webhook
```json
Request: {
  "event": "string",
  "data": "object"
}
Response: {
  "status": "success"
}
```

---

## Authentication Headers

All authenticated endpoints require:
```
Authorization: Bearer <token>
```

## Rate Limiting

- Standard endpoints: 100 requests per 15 minutes
- Search endpoints: 30 requests per minute
- Upload endpoints: 10 requests per minute
- Emergency endpoints: No limit

## Error Response Format

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": "object (optional)"
  }
}
```

## Pagination Format

All paginated endpoints follow this format:
```json
{
  "data": "array",
  "pagination": {
    "page": "number",
    "limit": "number",
    "total": "number",
    "totalPages": "number",
    "hasNext": "boolean",
    "hasPrev": "boolean"
  }
}
```

---

## GDPR/CCPA Compliance Endpoints

### POST `/api/gdpr/data-request`
Request user data export
```json
Request: {
  "userId": "string"
}
Response: {
  "requestId": "string",
  "status": "processing",
  "estimatedCompletionDate": "date"
}
```

### POST `/api/gdpr/delete-account`
Request account deletion
```json
Request: {
  "userId": "string",
  "reason": "string",
  "password": "string"
}
Response: {
  "requestId": "string",
  "scheduledDeletionDate": "date"
}
```

### POST `/api/gdpr/opt-out`
Opt out of data processing
```json
Request: {
  "userId": "string",
  "dataTypes": "array"
}
Response: {
  "message": "Opt-out preferences updated"
}
```

---

**Total Endpoints: 150+**

**Note:** All endpoints support HTTPS only. API versioning is handled via URL path (e.g., `/api/v1/...`).
