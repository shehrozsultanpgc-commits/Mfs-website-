# MFS Growth Agency — Administrative Security & Camouflage Documentation

## Overview
This document provides security guidelines for managing and accessing the **MFS Growth Agency Admin Operations Portal**.

---

## 1. Security Camouflage & Decoy System Status Page
To protect administrative access against public scanners and unauthorized access attempts:

1. **Zero Exposed Login Forms**: All standard email and password input fields have been completely removed from the public admin page (`/admin`).
2. **Decoy System Status View**: Visiting the admin URL displays the **MFS Growth Public Infrastructure & Network Diagnostics** page. It presents real-time telemetry, edge network response times, API availability, and service health metrics, creating a 100% convincing decoy with zero indication that an admin portal exists.

---

## 2. Secret Logo Trapdoor & Master PIN
Authorized administrators access the portal via a hidden trapdoor:

1. **Trigger**: Click or tap the **MFS Growth Logo** located in the top-left header of the decoy system status page.
2. **Secret Modal**: Triggers a secure modal requesting the **Master Clearance PIN**.
3. **Master Clearance PIN**: `03116191234` (also supports custom `VITE_ADMIN_PIN` environment variable).
4. **Access Grant**: Submitting `03116191234` verifies the clearance, assigns Executive Super Admin privileges, and unlocks the full **Admin Dashboard**.
5. **Decoy Retention**: If an incorrect PIN or no input is provided, the decoy system status page remains active with zero backend exposure.

---

## 3. Session Inactivity Protection
Session clearance (`adminPinVerified`) automatically expires after periods of inactivity to protect sensitive administrative operations.

