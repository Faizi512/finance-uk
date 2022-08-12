
class Common {
  constructor() {
    var CI = this;
    this.currentTab = 0;
    this.formValidation = {}
    this.ip_Address = '';
    $.getJSON('https://ipapi.co/json/', function(data) {
      if (data != null && data.ip != undefined && typeof (data.ip) == "string") {
        CI.ip_Address = data.ip;
      }
    });
    window.Parsley.on('field:error', function() {
      $(".btn-progress").removeClass("in-progress")
    });

    window.FontAwesomeConfig = {
      searchPseudoElements: true
    }
  }


  showToolTip(){
    $('[data-toggle="tooltip"]').tooltip();
  }

  getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
    }
  }

  getFormattedCurrentDate() {
    var date = new Date();
    var day = this.addZero(date.getDate());
    var monthIndex = this.addZero(date.getMonth() + 1);
    var year = date.getFullYear();
    var min = this.addZero(date.getMinutes());
    var hr = this.addZero(date.getHours());
    var ss = this.addZero(date.getSeconds());

    return day + '/' + monthIndex + '/' + year + ' ' + hr + ':' + min + ':' + ss;
  }

  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  validate(form){
    this.formValidation = $("#dealform").parsley({
        trigger: "focusout",
        errorClass: 'error',
        successClass: 'valid',
        errorsWrapper: '<div class="parsley-error-list"></div>',
        errorTemplate: '<label class="error"></label>',
        errorsContainer (field) {
          if(field.$element.hasClass('approve')){
            return $('.error-checkbox')
          }
          return field.$element.parent()
        },
    })
    this.formValidation = $("#loanform").parsley({
        trigger: "focusout",
        errorClass: 'error',
        successClass: 'valid',
        errorsWrapper: '<div class="parsley-error-list"></div>',
        errorTemplate: '<label class="error"></label>',
        errorsContainer (field) {
          if(field.$element.hasClass('approve')){
            return $('.error-checkbox')
          }
          return field.$element.parent()
        },
    })
    this.validateEmail()
  }

  validateEmail(){
    var CI = this
    window.Parsley.addValidator('validemail', {
      validateString: function(value){
        var xhr = $.ajax('https://go.webformsubmit.com/dukeleads/restapi/v1.2/validate/email?key=50f64816a3eda24ab9ecf6c265cae858&value='+ value)
        return xhr.then(function(json) {
          if (json.status == "Valid") {
            CI.isEmail = true
            return true
          }else{
            return $.Deferred().reject("Please Enter Valid Email Address");
          }
        })
      },
      messages: {
         en: 'Please Enter Valid Email Address',
      }
    });
  }

  showTab(n=0) {
    var tabs = $(".tab");
    if (!tabs[n]) return;
    tabs[n].style.display = "block";
    this.fixStepIndicator(n)
    $(".btn-progress").removeClass("in-progress")
  }



  showCircle(){
    $(".btn-progress").addClass("in-progress")
  }

  fixStepIndicator(num) {
    var progress = document.getElementById('progressBar');
    if(num >= 0) {
      progress.style.width = (Math.ceil(num*4.5))+"%";
      $(".progress-percent").text((Math.ceil(num*4.5))+"%  Complete" );
    }
  }

  backStep(n){
    if (this.currentTab > 0) {
      var tabs = $(".tab");
      tabs[this.currentTab].style.display = "none";
      this.currentTab = this.currentTab + n;
      this.showTab(this.currentTab);
    }
  }

  nextStep(n) {
    this.showCircle();
    var CI = this;
    $('#dealform').parsley().whenValidate({
      group: 'block-' + this.currentTab
    }).done(() =>{
      var tabs = $(".tab");
      tabs[CI.currentTab].style.display = "none";
      CI.currentTab = CI.currentTab + n;
      if (CI.currentTab >= tabs.length) {
        if (CI.isPhone == true){
          CI.postData()
        }else{
          $('#dealform').parsley().validate()
        }
        return true
      }
      CI.showTab(CI.currentTab);
    })
  }

  getData() {
    var day = $( "#dayOfBirth option:selected" ).val();
    var month = $( "#monthOfBirth option:selected" ).val();
    var year = $( "#yearOfBirth option:selected" ).val();
    var dateofbirth = year + "/" + month + "/" +day;
    return {
      thirdPartyPhone: $("input[name='thirdPartyPhone']:checked"). val() || '0',
      thirdPartyTextMessage: $("input[name='thirdPartyTextMessage']:checked"). val() || '0',
      thirdPartyEmail: $("input[name='thirdPartyEmail']:checked"). val() || '0',
      bankDebitCardType:this.getUrlParameter('bankDebitCardType') || $("input[name='bankDebitCardType']:checked"). val() || '',
      bankSortCode:this.getUrlParameter('bankSortCode') || $(".bankSortCode").val() || '',
      bankAccountNumber:this.getUrlParameter('bankAccountNumber') || $(".bankAccountNumber").val() || '',
      expenseFood:this.getUrlParameter('expenseFood') || $(".expenseFood").val() || '',
      expenseTransport:this.getUrlParameter('expenseTransport') || $(".expenseTransport").val() || '',
      expenseUtilities:this.getUrlParameter('expenseUtilities') || $(".expenseUtilities").val() || '',
      expenseOther:this.getUrlParameter('expenseOther') || $(".expenseOther").val() || '',
      expenseAllLoans:this.getUrlParameter('expenseAllLoans') || $(".expenseAllLoans").val() || '',
      expenseHousing:this.getUrlParameter('expenseHousing') || $(".expenseHousing").val() || '',
      workTimeAtEmployer:this.getUrlParameter('workTimeAtEmployer') || $( "#workTimeAtEmployer option:selected" ).val() || '',
      workIndustry:this.getUrlParameter('workIndustry') || $( "#workIndustry option:selected" ).val() || '',
      workCompanyName:this.getUrlParameter('workCompanyName') || $(".workCompanyName").val() || '',
      incomeNextDate2:this.getUrlParameter('incomeNextDate2') || $(".incomeNextDate2").val() || '',
      incomeNextDate1:this.getUrlParameter('incomeNextDate1') || $(".incomeNextDate1").val() || '',
      incomePaymentFrequency:this.getUrlParameter('incomePaymentFrequency') || $( "#incomePaymentFrequency option:selected" ).val() || '',
      bankDirectDeposit:this.getUrlParameter('bankDirectDeposit') || $("input[name='bankDirectDeposit']:checked"). val() || '',
      incomeNetMonthly:this.getUrlParameter('incomeNetMonthly') || $("input[name='incomeNetMonthly']"). val() || '',
      incomeType:this.getUrlParameter('incomeType') || $( "#incomeType option:selected" ).val() || '',
      monthsAtAddress: this.getUrlParameter('monthsAtAddress') || $( "#monthsAtAddress option:selected" ).val() || '',
      residentialStatus:this.getUrlParameter('residentialStatus') || $("input[name='residential-status']:checked"). val() || '',
      numberOfDependents: this.getUrlParameter('numberOfDependents') || $( "#dependents option:selected" ).val() || '',
      maritalStatus: this.getUrlParameter('maritalStatus') || $("input[name='merital-status']:checked"). val() || '',
      title: this.getUrlParameter('title') || $("input[name='title']:checked"). val() || '',
      dob:dateofbirth,
      loanDurationMonths: this.getUrlParameter('loan_duration_months') || "",
      loanAmount:this.getUrlParameter('loan_amount') || $("input[name='loan_amount']"). val() || '',
      loanPurpose: this.getUrlParameter('loanPurpose') || $( "#loan_purpose option:selected" ).val() || '',
      postCode: this.getUrlParameter('postcode') || $(".postcode").val() || '',
      street: this.getUrlParameter('street1') || $(".street").val() || '',
      city: this.getUrlParameter('towncity') || $(".city").val() || '',
      houseNumber: this.getUrlParameter('flatNumber') || $(".flatNumber").val() || '',
      county:this.getUrlParameter('county') || $(".county").val() || '',
      firstName: this.getUrlParameter('firstname') || $(".first_name").val() || '',
      lastName: this.getUrlParameter('lastname') || $(".last_name").val() || '',
      email: this.getUrlParameter('email') || $("input[name='email']").val() || '',
      cellPhone: this.getUrlParameter('phone1') || $(".phone").val() || '',
      homePhone:this.getUrlParameter('homePhone') || $(".homePhone").val() || '',
      workPhone:this.getUrlParameter('workPhone') || $(".workPhone").val() || '',
      userIp: this.ip_Address|| "192.168.1.1",
      sid: this.getUrlParameter('sid') || 1,
      ssid: this.getUrlParameter('ssid') || 1,
      ad_set:this.getUrlParameter('ad_set') || 1,
      source: this.getUrlParameter('source') ||  'google3',
      c1: this.getUrlParameter('c1') || this.getUrlParameter('bstransid') || this.getUrlParameter('transid') || '',
      adgroupid: this.getUrlParameter('adgroupid') || '',
      campaign: this.getUrlParameter('campaign') || '',
      productId: "4",
      price: "15",
      testMode: this.getUrlParameter('testMode'),
      testSold: this.getUrlParameter('testSold'),
    };
  }

  postData() {
    var CI = this;
    var data = this.getData();
    console.log(data)
    // Form Submisson
    this.firePixel()
    this.submitLead(data)
    this.showloader()
  }

  showloader(){
    var CI = this;
    $(".progress-head").hide()
    $("#myNav").css('height', '100%')
  }

  firePixel(){
    dataLayer.push({'event': 'transaction'})
  }

  submitLead(data){
     var CI = this;
    $.ajax({
      type: "POST",
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      url: "/deliveries",
      data: data,
      success: function(data) {
        if (data.response.status  == 1) {
          window.location = data.response.redirect_url
        }else if(data.response.status  == 2){
           window.location = data.response.rejectUrl
        }else{
          var errors = data.response.errors
          var errorlist = []
          for (var index = 0; index < errors.length; ++index) {
              errorlist.push(`<p>${Object.values(errors[index])[0]} </p>`)
          }
          $(".form-error").html(errorlist)
          $(".form-error").show()
          $(".progress-head").show()
          CI.currentTab = CI.currentTab - 1
          CI.backStep(-1)
          $("#myNav").css('height', '0%')
        }
        console.log(data)
      },
      dataType: "json"
    })
  }

}
export default Common;

