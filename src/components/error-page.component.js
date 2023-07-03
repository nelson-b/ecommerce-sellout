import React  from "react";

function ErrorPage(){
    return(
        <div class="container">
        <center>
        <h1>404</h1>
        <p><strong>Page not found</strong></p>
  
        <p>
          The site configured at this address does not
          contain the requested page.
        </p>
  
        <p>
          If this is your site, make sure that the filename case matches the URL.<br/>
        </p>
        </center>
      </div>
    );
}

export default ErrorPage;