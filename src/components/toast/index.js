



function Toast() {
  function myFunction(x){

    var popup = document.querySelector('.'+x)
    if(popup.style.display=='none'){
      popup.style.display='flex'
    }
    else{
      popup.style.display='none'
      
    }
  }
  setTimeout(function(){
    document.querySelector('.toaster-list').style.display='none'
  }, 5600);

  return (
    <>
      <div className="toaster-list">
        <div className="error-toast ">
          <div className="cross-in" onClick={() => myFunction('error-toast')} >
            <div className="cr-line-1"></div>
            <div className="cr-line-2"></div>
          </div>
          <div className="content-inside">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                gap: "10px",

                alignItems: "center",
              }}
            >
              <div className="icon-toast">!</div>
              <div className="toaster-text">
                Error Posting Data, Please Check Format
              </div>
            </div>
          </div>
          <div className="bottom-div">
            <div className="bottom-line"></div>
          </div>
        </div>





        <div className="success">
          <div className="cross-in" >
            <div className="cr-line-1"></div>
            <div className="cr-line-2"></div>
          </div>
          <div className="content-inside">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                gap: "10px",

                alignItems: "center",
              }}
            >
              <div className="icon-toast icon-2">&#10004;</div>
              <div className="toaster-text">
               Data Posted Successfully
              </div>
            </div>
          </div>
          <div className="bottom-div">
            <div className="bottom-line bottom-line-2"></div>
          </div>
        </div>
        
      </div>
      {/* <App2/> */}
    </>
  );
}

export default Toast;
