const version = 'v6';

function CustomCheckBoxes(b){
      let box = document.getElementById(b);
      let status = box.getAttribute('data-status');
      if(status == 'checked'){
          box.setAttribute('data-status', "not-checked");
      }else{
          box.setAttribute('data-status', "checked");
      }
  }

  document.querySelectorAll('.cta-button').forEach(btn => btn.addEventListener('click', ()=>{
    if(btn.getAttribute('data-target') == '#resourcesFormModal'){
      ResetPages();
    }

  }))

  function SetBrand(){

    let inputs = document.querySelectorAll('.hs-input');
    let labels = document.querySelectorAll('.hbspt-form label');
    inputs.forEach(inp => {
        inp.style = "font-family: 'GT-Eesti-Pro-Display-Bold', sans-serif !important;font-weight: normal !important;";
    })
    labels.forEach(lbl => {
        lbl.style = "font-family: 'GT-Eesti-Pro-Display-Bold', sans-serif;font-weight: bolder;";
    })

}

  function ResetPages(){
    document.getElementById('pages-scroll').style = '';
  }

  var selectedResources = [];
var resNames = [];
document.getElementById('toPageTwo').addEventListener('click', (e)=>{
    var checkBoxesChecked = 0;
      // validate at least 1 is checked
      document.querySelectorAll('.custom-resource-select').forEach(s =>{
          if(s.getAttribute('data-status') == 'checked'){
              checkBoxesChecked ++;
        console.log('checked');
              selectedResources.push(s.getAttribute('id'));
        selectedResources.push(s.getAttribute('data-name'));
          }
      })

      var ck = document.cookie;
      if(checkBoxesChecked > 0){
          ErrorMessage('check-box-error', 'success');
    let ckString = 'resourceFormSubmitted' + version + '=true';
          if(/ckString/.test(ck)){
              downloadSelectedResources();
      confirmationPage();
          }else {
              e.preventDefault();
              ScrollElementToTop('page-2');

          }
      }else{
          console.log('not enough checked');
          ErrorMessage('check-box-error', 'Please select at least 1 resource type');
      }
  })

  function ErrorMessage(id, message){
      if(message == 'success'){
          document.getElementById(id).textContent = '';
          document.getElementById(id).style = '';

      }else {
          document.getElementById(id).textContent = message;
          document.getElementById(id).style = 'display: flex !important;';
      }
  }

  function downloadSelectedResources(){
      selectedResources.forEach(resource => {
    try {
              document.querySelector('.res-' + resource).click();
            document.querySelector('.res-' + resource).remove();
      }catch(e){
        console.log(e);
      }
      })
    document.cookie = 'resourceFormSubmitted' + version + '=true; domain=bethany.org; max-age=31536000; path=/;';
  confirmationPage();
  }

function confirmationPage(){
      ScrollElementToTop('page-3');


    let resDownloadedString = 'You downloaded ';

    if(resNames.length > 0){
        resNames.forEach(name => {
            let n = name + '\n';
            resDownloadedString += n;
        })
    }else {
      resDownloadedString = 'Thanks for downloading resources for National Foster Care Month!';
    }

    document.querySelector('#page-3 p').textContent = resDownloadedString;
}

var ty = 0;


  function ScrollElementToTop(elementId){
        let pages = ['page-1','page-2','page-3'];
        let container = document.getElementById('pages-scroll');
        let element = document.getElementById(elementId);
        let stopHeight = document.querySelector('.modal-header').getBoundingClientRect().bottom;
        
        while(element.getBoundingClientRect().top > stopHeight){
            container.style = 'transform: translateY(' + ty + 'px);';
            ty --;
        }

        element.style = 'opacity: 1 !important;';

        pages.forEach(page =>{
            if(page != elementId){
                document.getElementById(page).style = 'opacity: 0 !important;';
            }
        })
  }
