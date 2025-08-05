openssl req -new -keyout key.pem -out csr.pem -config san.cnf
pass phrase : password

openssl x509 -req -in csr.pem -signkey key.pem -days 365 -out cert.pem -extfile san.cnf -extensions req_ext
Enter pass phrase for key.pem: password
Certificate request self-signature ok
subject=CN = keycloak.local

keytool -importcert -alias keycloak -file cert.pem -keystore keystore.jks
Enter keystore password:  password
Re-enter new password: password

openssl rsa -in ./key.pem -out ./key_no_password.pem
Enter pass phrase for ./key.pem: password
writing RSA key

openssl pkcs12 -export -in cert.pem -inkey key.pem -name keycloak -out keystore.p12

keytool -importkeystore -destkeystore keystore.jks -srckeystore keystore.p12 -srcstoretype PKCS12 -alias keycloak

keytool -list -v -keystore keystore.jks
Enter keystore password:  
Keystore type: PKCS12
Keystore provider: SUN
Your keystore contains 1 entry
Alias name: keycloak
Creation date: Jul 24, 2025
Entry type: PrivateKeyEntry
Certificate chain length: 1
...