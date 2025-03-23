# file-server-master
An online file manage system, fast and secure. 



## Development

clone the repo to local

``` bash
git clone https://github.com/jvxiao/file-server-master.git
```

- ### start backend
Start the backend you may need two terminals, one for the JSON server, the other for the file manage service. This problem will be solved in later version. 

```

  cd backend
  npm run db:start          # start JSON Server
  npm run serve:start       # start file manage service

```

-  ### start the web

``` bash
  cd web
  npm run dev
```

By now, you may able to view the dashboard page on port 9000. Disable the browser's security policy to prevent the API interface from being blocked by CORS policy.
