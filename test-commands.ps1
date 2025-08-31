# API Testing Commands for PowerShell

## 1. Test Signup
$body = @{
    name = "John Doe"
    email = "john@example.com" 
    password = "Password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/signup" -Method POST -ContentType "application/json" -Body $body

## 2. Test Login
$loginBody = @{
    email = "john@example.com"
    password = "Password123"
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method POST -ContentType "application/json" -Body $loginBody
$token = $loginResponse.data.token
Write-Host "Token: $token"

## 3. Test Protected Route (Profile)
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/profile" -Method GET -Headers $headers

## 4. Test Health Check
Invoke-RestMethod -Uri "http://localhost:3000/health" -Method GET
