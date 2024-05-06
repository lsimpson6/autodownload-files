const version = 'v7.22';
const isMobileDevice = window.innerWidth < 768 ? true : false;
window.addEventlistener('load', ()=>{
      if(isMobileDevice){
              document.querySelectorAll('.cta-button').forEach(btn => btn.addEventListener('click', (e)=>{
                    if(btn.getAttribute('data-target') == '#resourcesFormModal'){
                       btn.setAttribute('data-target') == "";
                      }
              }))
      }
});

function CustomCheckBoxes(b){
      let box = document.getElementById(b);
      let status = box.getAttribute('data-status');
      let cCount = 0;
      let unCount = 0;
      if(status == 'checked'){
          box.setAttribute('data-status', "not-checked");
      }else{
          box.setAttribute('data-status', "checked");
      }

      document.querySelectorAll('.custom-resource-select').forEach(sel => {
            if(sel.getAttribute('data-status') == 'checked'){
                  cCount ++;
            }
      })

      document.getElementById('amount-selected').textContent = cCount + ' resource(s) selected';
  }

  document.querySelectorAll('.cta-button').forEach(btn => btn.addEventListener('click', (e)=>{
    if(isMobileDevice){
          e.preventDefault
            let sel = '.res' + btn.getAttribute('id');
        document.querySelector(sel).click();
          console.log(sel);
    }else {
        if(btn.getAttribute('data-target') == '#resourcesFormModal'){
            ResetPages();
          }
    }
  }))

  function ResetPages(){
      document.getElementById('pages-scroll').style = '';
      document.getElementById('page-1').style = 'opacity: 1;';
      document.getElementById('page-2').style = 'opacity: 0;';
        document.getElementById('page-3').style = 'opacity: 0;';
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
              resNames.push(s.getAttribute('data-name'));
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
      console.log('.res' + resource);
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
