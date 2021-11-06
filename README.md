# ps5-scout

A project based on https://github.com/lkallas/ps5-telia-scout Telia PS5 scout to try out AWS. The scheduling service was deployed on AWS EC2 
and the service that queries the product list from Telia was deployed as AWS Lambda. For reasons unknown at some point Gmail mails stopped being delivered and 
some time later the Messente SMSes also stopped being delivered even though their logs showed the messeges being sent. The latter conveniently happened when 
the console came in stock.

This is a slightly modified version of lkallases approach by providing the request with a user-agent that is provided when the request is made from Safari.

Exposes an endpoint to query last 50 lines from the logs. This was used to check whether the fetcher was working.

Whatever you do with this code is on you. I have not ran this since September so I do not know if this approach is still working.
