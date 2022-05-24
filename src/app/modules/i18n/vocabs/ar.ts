// USA
export const locale = {
  lang: 'ar',
  data: {
    TRANSLATOR: {
      SELECT: 'Select your language',
    },
    MENU: {
      NEW: 'new',
      ACTIONS: 'Actions',
      CREATE_POST: 'Create New Post',
      PAGES: 'Pages',
      FEATURES: 'Features',
      APPS: 'Apps',
      DASHBOARD: 'Dashboard',
    },
HR:{
    INPUTS:{
     NAME:"الاسم",
	 FILTER:"بحث"
	},
	BUTTONS:{
		ADD:"اضافة",
		CLOSE:"غلق",
		EDIT:"تعديل"
	},
	TITLES:{
		ADDORUPDATE:"اضافة او تعديل",
	}
},
SHARE:{
    INPUTS:{
     NAME:"الاسم",
	 FILTER:"بحث"
	},
	BUTTONS:{
		ADD:"اضافة",
		CLOSE:"غلق",
		EDIT:"تعديل"
	},
	TITLES:{
		ADDORUPDATESTATE:" اضافة او تعديل المحافظة",
		ADDORUPDATEREGION:" اضافة او تعديل المنطقة",
	}
},

    AUTH: {
      GENERAL: {
        OR: 'Or',
        SUBMIT_BUTTON: 'Submit',
        NO_ACCOUNT: 'Don\'t have an account?',
        SIGNUP_BUTTON: 'تسجيل الدخول',
        FORGOT_BUTTON: 'فقدت كلمة السر',
        BACK_BUTTON: 'رجوع',
        PRIVACY: 'Privacy',
        LEGAL: 'Legal',
        CONTACT: 'Contact',
		SIGNIN_BUTTON:'دخول'
      },
      LOGIN: {
        TITLE: 'حساب الدخول',
        BUTTON: 'دخول',
      },
      FORGOT: {
        TITLE: 'Forgotten Password?',
        DESC: 'Enter your email to reset your password',
        SUCCESS: 'Your account has been successfully reset.'
      },
      REGISTER: {
        TITLE: 'تسجيل',
        DESC: 'Enter your details to create your account',
        SUCCESS: 'Your account has been successfuly registered.'
      },
      INPUT: {
        EMAIL: 'Email',
        FULLNAME: 'Fullname',
        PASSWORD: 'الرقم السرى',
        CONFIRM_PASSWORD: 'Confirm Password',
        USERNAME: 'المستخدم',
		COMPANYCODE:'كود الشركة'
      },
      VALIDATION: {
        INVALID: '{{name}} is not valid',
        REQUIRED: '{{name}} مطلوب',
        MIN_LENGTH: '{{name}} اقل عدد حروف {{min}}',
		MAX_LENGTH: '{{name}} اكبر عدد حروف {{max}}',
        AGREEMENT_REQUIRED: 'Accepting terms & conditions are required',
        NOT_FOUND: 'The requested {{name}} is not found',
        INVALID_LOGIN: 'The login detail is incorrect',
        REQUIRED_FIELD: 'Required field',
        MIN_LENGTH_FIELD: 'Minimum field length:',
        MAX_LENGTH_FIELD: 'Maximum field length:',
        INVALID_FIELD: 'Field is not valid',
		INVALID_CREDENTIALS:'تاكد من بيانات المستخدم',
		INVALID_COMPANY:'تاكد من كود الشركة'

      }
    },
    ECOMMERCE: {
      COMMON: {
        SELECTED_RECORDS_COUNT: 'Selected records count: ',
        ALL: 'All',
        SUSPENDED: 'Suspended',
        ACTIVE: 'Active',
        FILTER: 'Filter',
        BY_STATUS: 'by Status',
        BY_TYPE: 'by Type',
        BUSINESS: 'Business',
        INDIVIDUAL: 'Individual',
        SEARCH: 'Search',
        IN_ALL_FIELDS: 'in all fields'
      },
      ECOMMERCE: 'eCommerce',
      CUSTOMERS: {
        CUSTOMERS: 'Customers',
        CUSTOMERS_LIST: 'Customers list',
        NEW_CUSTOMER: 'New Customer',
        DELETE_CUSTOMER_SIMPLE: {
          TITLE: 'Customer Delete',
          DESCRIPTION: 'Are you sure to permanently delete this customer?',
          WAIT_DESCRIPTION: 'Customer is deleting...',
          MESSAGE: 'Customer has been deleted'
        },
        DELETE_CUSTOMER_MULTY: {
          TITLE: 'Customers Delete',
          DESCRIPTION: 'Are you sure to permanently delete selected customers?',
          WAIT_DESCRIPTION: 'Customers are deleting...',
          MESSAGE: 'Selected customers have been deleted'
        },
        UPDATE_STATUS: {
          TITLE: 'Status has been updated for selected customers',
          MESSAGE: 'Selected customers status have successfully been updated'
        },
        EDIT: {
          UPDATE_MESSAGE: 'Customer has been updated',
          ADD_MESSAGE: 'Customer has been created'
        }
      }
    }
  }
};
