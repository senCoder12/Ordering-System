# Ordering-System
Electronics Components Ordering System

1. createOrder - (placed by sales guy)
	URL: http://localhost:8080/order
	METHOD: POST
	BODY: 
 {
        "customer_info": {
            "email": "mayukhsen123@gmail.com",
            "name": "Mayukh sen",
            "address": "123/B random address"
        },
        "productLists": [
            {
                "name": "Jumper Wire"
            },
            {
                "name": "Resistor box"
            }
        ]
    }
	RESPONSE:
	{
    		"customer_info": {
        		"email": "mayukhsen123@gmail.com",
        		"name": "Mayukh sen",
        		"address": "123/B random address"
    		},
    		"productLists": [
        	{
            	"name": "Jumper Wire",
            	"vendor": "6398b4f4d117c1186ffc393f",
            	"price": 1200,
            	"_id": "6398b6add117c1186ffc394d"
        	},
        	{
            	"name": "Resistor box",
            	"vendor": "6398b5c1d117c1186ffc3944",
            	"price": 900,
            	"_id": "6398b6add117c1186ffc394e"
        	}
    		],
    		"orderState": "In Progress",
    		"timeToDeliver": "2022-12-13T17:14:27.869Z",
    		"_id": "6398b6add117c1186ffc394c",
    		"createdAt": "2022-12-13T17:30:21.836Z",
    		"updatedAt": "2022-12-13T17:30:21.836Z"
	}

2. CreateNewVendor - user can also create new vendor on the system
	URL: http://localhost:8080/vendor
	METHOD: POST
	BODY: 
	{
		"name" : "Swaraj Biswas",
    		"product" : "Jumper Wire",
		"price" : 1200
	}
	RESPONSE: 
	{
    		"name": "Swaraj Biswas",
    		"product": "Jumper Wire",
    		"price": 1200,
    		"deliveryRating": 5,
    		"count": 1,
    		"overallVendorRating": 5,
    		"avgRating": 5,
    		"_id": "6398b4f4d117c1186ffc393f",
    		"createdAt": "2022-12-13T17:23:00.839Z",
    		"updatedAt": "2022-12-13T17:23:00.839Z"
	}

3. For Multiple vendor creation
	URL: http://localhost:8080/vendor/multiple
	METHOD: POST
	BODY:
	[
    		{
    			"name" : "Lezz Sinha",
    			"product" : "Jumper Wire",
    			"price" : 1100
		},
		{
    			"name" : "Projjal Misra",
    			"product" : "Resistor box",
    			"price" : 900
		}
	]
	RESPONSE:
	[
    {
        "name": "Lezz Sinha",
        "product": "Jumper Wire",
        "price": 1100,
        "deliveryRating": 5,
        "count": 1,
        "overallVendorRating": 5,
        "avgRating": 5,
        "_id": "6398b5c1d117c1186ffc3943",
        "createdAt": "2022-12-13T17:26:25.222Z",
        "updatedAt": "2022-12-13T17:26:25.222Z"
    },
    {
        "name": "Projjal Misra",
        "product": "Resistor box",
        "price": 900,
        "deliveryRating": 5,
        "count": 1,
        "overallVendorRating": 5,
        "avgRating": 5,
        "_id": "6398b5c1d117c1186ffc3944",
        "createdAt": "2022-12-13T17:26:25.222Z",
        "updatedAt": "2022-12-13T17:26:25.222Z"
    }
     ]
4. viewOrder - (with the vendor details assigned by the system)
	URL: http://localhost:8080/order
	METHOD: GET
	RESPONSE:
	[
    {
        "customer_info": {
            "email": "mayukhsen123@gmail.com",
            "name": "Mayukh sen",
            "address": "123/B random address"
        },
        "_id": "6398b6add117c1186ffc394c",
        "productLists": [
            {
                "name": "Jumper Wire",
                "vendor": "6398b4f4d117c1186ffc393f",
                "price": 1200,
                "_id": "6398b6add117c1186ffc394d"
            },
            {
                "name": "Resistor box",
                "vendor": "6398b5c1d117c1186ffc3944",
                "price": 900,
                "_id": "6398b6add117c1186ffc394e"
            }
        ],
        "orderState": "In Progress",
        "timeToDeliver": "2022-12-13T17:14:27.869Z",
        "createdAt": "2022-12-13T17:30:21.836Z",
        "updatedAt": "2022-12-13T17:30:21.836Z"
    }
	]

6. SubmitFinalOrder - sales guy finalize the order and move it to “Ready To fulfillment” state
	URL: http://localhost:8080/order?id=<OrderId>
	METHOD: PATCH
	RESPONSE:
	{
    		"message": "Ready to fulfillment"
	}

7. MarkOrderComplete - sales guy will mark the order complete
	URL: http://localhost:8080/order/done?id=<orderId>
	METHOD: PATCH
	RESPONSE:
	{
    		"message": "Order completed successfully"
	}

8. submitVendorReview - sales will give review to the vendor
	URL: http://localhost:8080/vendor?vendorId=<VendorId>
	METHOD: PATCH
	BODY: 
	{
    		"deliveryRating": 4.8,
    		"overallVendorRating" : "4.4"
	}
	RESPONSE:
	{
    		"_id": "6398b4f4d117c1186ffc393f",
    		"name": "Swaraj Biswas",
    		"product": "Jumper Wire",
    		"price": 1200,
    		"deliveryRating": 4.9,
    		"count": 2,
    		"overallVendorRating": 4.7,
    		"avgRating": 4.8,
    		"createdAt": "2022-12-13T17:23:00.839Z",
    		"updatedAt": "2022-12-13T17:48:29.346Z"
	}


	
