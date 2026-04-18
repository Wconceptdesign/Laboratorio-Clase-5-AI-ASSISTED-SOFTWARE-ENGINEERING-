# Data Model: Assistance System

## Entity: Employee (`employees`)
Stores information about recognized personnel based on the SSOT.
- `id` (PK, uuid)
- `document_id` (string, unique constraint) - Escanned/typed ID.
- `full_name` (string) - First name and last name.

## Entity: Entry Exit Record (`entries`)
Consolidated daily log per employee.
- `id` (PK, uuid)
- `employee_id` (FK to `employees`)
- `entry_time` (timestamp, not null)
- `has_laptop` (boolean, not null, default false)
- `laptop_brand` (string, nullable)
- `laptop_serial` (string, nullable)
- `authorized_by` (string, nullable)
- `exit_time` (timestamp, nullable)
- `withdraw_laptop` (boolean, nullable)
- `verified_by` (string, nullable)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## Validation Rules & Constraints
- Application logic MUST ensure `laptop_brand`, `laptop_serial`, and `authorized_by` are set if `has_laptop` = true.
- DB logic should ideally have a constraint, else class-validator must reject DTOs explicitly before persistence.
- `exit_time` MUST be >= `entry_time`.
- `withdraw_laptop` and `verified_by` logic applies similarly.
- A single user MUST NOT have more than one open entry record without an exit time.
