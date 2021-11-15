// const PROD = process.env.NODE_ENV === "production";
// const BASE_URL = PROD
//   ? `${window.location.protocol}//${window.location.hostname}/api-gateway`
//   : "http://localhost:9092";

// Comment lines 7-8 before commit
const PROD = true;
const BASE_URL = "https://bookrightaway.com/api-gateway";

const LOGIN_SERVICE_BASE_URL = BASE_URL + "/login-service";
const HOTEL_SERVICE_BASE_URL = BASE_URL + "/hotel-service";
const SEARCH_SERVICE_BASE_URL = BASE_URL + "/search-service";
const NOTIFICATION_SERVICE_BASE_URL = BASE_URL + "/notification-service";
const CIRCUIT_BREAKER_BASE_URL = BASE_URL + "/circuit-breaker";
const USER_SERVICE_BASE_URL = BASE_URL + "/user-service";
const PAYMENT_SERVICE_BASE_URL = BASE_URL + "/payment-service";
const REVIEW_SERVICE_BASE_URL = BASE_URL + "/review-service";

const USER_DETAILS_PAGE_URL = USER_SERVICE_BASE_URL + "/user/fetch/email";
const PASSWORD_PAGE_URL = BASE_URL + "/passwordreset";
const URL_FOR_LOGIN_PAGE = BASE_URL + "/signin";
const EMAIL_NOTIFICATION_SERVICE_URL =
  NOTIFICATION_SERVICE_BASE_URL + "/v1/mails/forgot-password";
const URL_FOR_CHANGING_THE_PASSWORD =
  USER_SERVICE_BASE_URL + "/user/forget-password";
const RAZORPAY_URL = "https://checkout.razorpay.com/v1/checkout.js";
const PAYMENT_INITIATE_URL = PAYMENT_SERVICE_BASE_URL + "/payment/initiate";
const PAYMENT_REFUND_INITIATE_URL =
  PAYMENT_SERVICE_BASE_URL + "/payment/refund/initiate";
const PAYMENT_SUCCESSFUL_URL = PAYMENT_SERVICE_BASE_URL + "/payment/complete";
const BOOKING_URL = HOTEL_SERVICE_BASE_URL + "/booking/add";
const GENERATE_OTP_URL = USER_SERVICE_BASE_URL + "/otp/generate/";
const CHECK_OTP_URL = USER_SERVICE_BASE_URL + "/otp/check";

const APPLICATION_NAME = "BookRightAway";
const AMENITIES = [
  { key: "First-aid Services", label: "First-aid Services" },
  { key: "Room Service", label: "Room Service" },
  { key: "Restaurant/Coffee Shop", label: "Restaurant/Coffee Shop" },
  { key: "Health-Spa", label: "Health-Spa" },
  { key: "Dining Area", label: "Dining Area" },
  { key: "Lounge", label: "Lounge" },
  { key: "Childcare Services", label: "Childcare Services" },
];

const ROOMTYPES = [
  { label: "General", value: 355 },
  { label: "Semi Deluxe", value: 54 },
  { label: "Deluxe", value: 43 },
  { label: "Super Deluxe", value: 61 },
  { label: "Suite", value: 35 },
  { label: "Villa", value: 45 },
  { label: "Single", value: 55 },
  { label: "Double", value: 65 },
  { label: "King", value: 75 },
  { label: "Queen", value: 85 },
  { label: "Presedential", value: 95 },
];

const INCLUSIONS = [
  { key: "Free Wifi" },
  { key: "Free Breakfast" },
  { key: "Breakfast Buffet" },
  { key: "Free Breakfast and Dinner" },
  { key: "Free Breakfast, Lunch and Dinner" },
  { key: "Free Lunch" },
  { key: "Free Lunch and Dinner" },
  { key: "Free Dinner" },
  { key: "Full Board" },
  { key: "Half Board" },
  { key: "All Inclusive" },
  { key: "Complimentary Drinks, alcohol" },
];

const LOCATIONS = [
  { label: "Delhi" },
  { label: "Mumbai" },
  { label: "Bangalore" },
  { label: "Hyderabad" },
  { label: "Ahmedabad" },
  { label: "Chennai" },

  { label: "Kolkata" },
  { label: "Surat" },
  { label: "Pune" },
  { label: "Jaipur" },
  { label: "Lucknow" },
  { label: "Kanpur" },
  { label: "Nagpur" },
  { label: "Visakhapatnam" },
  { label: "Indore" },
];

const STATEOBJECT = {
  addressFlag: 0,
  hid: "",
  hname: "",
  hphone: "",
  hemail: "",
  htax: "",
  checkInTime: "",
  checkOutTime: "",
  localAddress: "",
  city: "",
  region: "",
  pincode: "",
  latitude: 0.0,
  longitude: 0.0,
  selectedAmenities: [],
  errors: {},
  landmarks: "",
  roomList: [
    {
      roomtype: "",
      maxallowed: "",
      roomcount: "",
      price: "",
      selectedInclusions: [],
    },
  ],
  hotelImages: [],
};

const DUMMY_STATEOBJECT = {
  addressFlag: 0,
  hid: "",
  hname: "Redis",
  hphone: "9871310263",
  hemail: "redis@gmail.com",
  htax: "5.2",
  checkInTime: "2222-12-12",
  checkOutTime: "2222-12-20",
  localAddress: "Delhi",
  city: "Delhi",
  region: "North Delhi",
  pincode: "110053",
  latitude: 0.0,
  longitude: 0.0,
  selectedAmenities: [{ key: "Restaurant/Coffee Shop" }, { key: "Lounge" }],
  errors: {},
  landmarks: "Hanuman Mandir",
  roomList: [
    {
      roomtype: "Deluxe",
      maxallowed: "2",
      roomcount: "3",
      price: "300",
      selectedInclusions: [{ key: "Free Wifi" }, { key: "Half Board" }],
    },
  ],
  err: "",
};

const MOCK_DATA_FROM_DB = {
  hotel_id: 23,
  hotelName: "asf1",
  phone: "7895623147",
  email: "redis@gmail.com",
  checkInTime: "2222-12-22",
  checkOutTime: "2222-12-22",
  taxRate: 12.0,
  localAddress: "Delhi",
  region: "sad",
  importantLandmarks: "Delhi",
  city: "Delhi",
  pincode: "110053",
  coordinates: null,
  rooms: [
    {
      roomTypeName: "Semi Deluxe",
      roomCapacity: 2,
      totalRoomCount: 3,
      roomPrice: 4444,
      inclusions: "Free Wifi,Breakfast Buffet,Free Breakfast, Lunch and Dinner",
    },
    {
      roomTypeName: "Deluxe",
      roomCapacity: 2,
      totalRoomCount: 3,
      roomPrice: 3333,
      inclusions: "Free Breakfast",
    },
  ],
  amenities:
    "Room Service,Restaurant/Coffee Shop,Lounge,Health-Spa,Dining Area,Childcare Services",
};

let mockInvoice = JSON.parse(`{ 
  "invoice_id": 4, 
  "hotelName": "jaswanth1",
  "userName": "fn1 ln1",
  "items": [
      [
          "cleaning",
          "2020-12-31T18:30:01.000+00:00",
          150.0,
          2,
          5.0,
          300.0
      ],
      [
          "breakfast",
          "2020-12-31T18:30:01.000+00:00",
          100.0,
          4,
          0.0,
          400.0
      ]
  ],

  
  "hemail": "e1",
  "hphone": "12334",
  "hlocAdd": "la1",
  "ucity": "c1",
  "hreg": "r1",
  "hlandMarks": "il1,il2",
  "hcity": "c2",
  "uemail": "e1",
  "uphone": "ph1",
  "uaddress": "la1",
  "upincode": "p1",
  "hpincode": "pc1"
}`);

// These are the different styles we can use for the button , each of them have different css
const BTN_STYLES = [
  "btn--primary--solid",
  "btn--warning--solid",
  "btn--danger--solid",
  "btn--success--solid",
  "btn--primary--outline",
  "btn--warning--outline",
  "btn--danger--outline",
  "btn--success--outline",
];

// We have buttons of two sizes
const BTN_SIZES = ["btn--medium", "btn--large"];

export {
  LOCATIONS,
  APPLICATION_NAME,
  LOGIN_SERVICE_BASE_URL,
  HOTEL_SERVICE_BASE_URL,
  SEARCH_SERVICE_BASE_URL,
  NOTIFICATION_SERVICE_BASE_URL,
  USER_SERVICE_BASE_URL,
  REVIEW_SERVICE_BASE_URL,
  AMENITIES,
  ROOMTYPES,
  INCLUSIONS,
  STATEOBJECT,
  DUMMY_STATEOBJECT,
  MOCK_DATA_FROM_DB,
  USER_DETAILS_PAGE_URL,
  URL_FOR_CHANGING_THE_PASSWORD,
  RAZORPAY_URL,
  PAYMENT_INITIATE_URL,
  PAYMENT_SUCCESSFUL_URL,
  PAYMENT_REFUND_INITIATE_URL,
  BOOKING_URL,
  GENERATE_OTP_URL,
  CHECK_OTP_URL,
  mockInvoice,
  BTN_STYLES,
  BTN_SIZES,
  URL_FOR_LOGIN_PAGE,
};
