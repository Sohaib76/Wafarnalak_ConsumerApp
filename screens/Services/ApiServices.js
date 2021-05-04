class Api {
  loginUser = (mobile, callback) => {
    console.log("mobile", mobile);

    fetch(
      "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/customer_login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mobile: mobile
          //   customerdeviceid: this.state.token
        })
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error == false) {
          callback({ isSuccess: true, response: responseJson });
          console.log("response logihn", responseJson);
        } else {
          console.log("error logihn", error);
          callback({ isSuccess: false, response: error });
        }
      });
  };

  verifyReferral = (otpcode, user, callback) => {
    console.log("otp", otpcode, user);
    console.log("code otop id", parseInt(user.otpid));

    fetch(
      "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/verify_customer_login_otp",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          otpid: parseInt(user.otpid),
          otpentered: parseInt(otpcode)
        })
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log("response logihn", responseJson);
        if (responseJson.error) {
          callback({ isSuccess: false, error: responseJson });
        } else {
          callback({ isSuccess: true, response: responseJson });
        }
      })
      .catch(error => {});
  };
  getsalons = (lat, long, callback) => {
    fetch(
      "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/all_service_provider",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          latitude: lat,
          longitude: long
        })
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log("response logihn", responseJson);
        if (responseJson.error) {
          callback({ isSuccess: false, error: responseJson });
        } else {
          callback({ isSuccess: true, response: responseJson });
        }
      })
      .catch(error => {});
  };
  getsalonJobs = (id, lat, long, callback) => {
    fetch(
      "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/get_saloon",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          spid: id,
          latitude: lat,
          longitude: long
        })
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log("res salon jobs", responseJson);
        if (responseJson.error) {
          callback({ isSuccess: false, error: responseJson });
        } else {
          callback({ isSuccess: true, response: responseJson });
        }
      })
      .catch(error => {});
  };
  placeorder = (
    userid,
    salonDetail,
    lat,
    long,
    finalDate,
    orderArray,
    grandTotal,
    slot,
    callback
  ) => {
    console.log("salonDetail", salonDetail);
    console.log("location", location);
    console.log("finalDate", finalDate);
    console.log("orderArray", orderArray);
    console.log("grandTotal", grandTotal);
    console.log("slot", slot);
    fetch(
      "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/add_booking",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          customerid: userid,
          spid: salonDetail,
          serviceid: 10,
          latitude: lat,
          longitude: long,
          servicedate: finalDate.toString(),
          discountprice: 0,
          wfpointsconsumed: 0,
          grandtotalprice: grandTotal,
          servicetimeid: 4,
          paymenttype: 1,
          orderdetails: orderArray
        })
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log("response place", responseJson);
        if (responseJson.error) {
          callback({ isSuccess: false, error: responseJson });
          console.log("response false", responseJson);
        } else {
          callback({ isSuccess: true, response: responseJson });
          console.log("response true", responseJson);
        }
      })
      .catch(error => {});
  };
  getonGoing = (id, callback) => {
    console.log("ongoing");
    fetch(
      "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/customer_ongoing_bookings",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          customerid: id
        })
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log("history--------", responseJson);
        if (responseJson.error) {
          callback({ isSuccess: false, error: responseJson });
          console.log("response place", responseJson);
        } else {
          callback({ isSuccess: true, response: responseJson });
          console.log("response place", responseJson);
        }
      })
      .catch(error => {});
  };
  geordersummery = (id, callback) => {
    console.log("ongoing", id);
    fetch(
      "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/view_order",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          orderid: id
        })
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log("summary--------", responseJson);
        if (responseJson.error) {
          callback({ isSuccess: false, error: responseJson });
          console.log("rsummary", responseJson);
        } else {
          callback({ isSuccess: true, response: responseJson });
          console.log("response place", responseJson);
        }
      })
      .catch(error => {});
  };
  historyorders = (id, callback) => {
    console.log("history");
    fetch(
      "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/customer_completed_bookings",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          customerid: id
        })
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log("history--------", responseJson);
        if (responseJson.error) {
          callback({ isSuccess: false, error: responseJson });
          console.log("response place", responseJson);
        } else {
          callback({ isSuccess: true, response: responseJson });
          console.log("response place", responseJson);
        }
      })
      .catch(error => {});
  };
}
const ApiServices = new Api();
export default ApiServices;
