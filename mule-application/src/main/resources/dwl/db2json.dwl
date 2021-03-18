%dw 2.0
output application/json

---

vars.sql_result distinctBy ($.ID) map (value, index) -> 
{
	"Identification":
		{
			FirstName: value.FirstName,
			LastName : value.LastName,
			DOB : value.DOB as Date {format: "MM/dd/yyyy"},
			Gender:value.Gender,
			Title :value.Title
		},
	"Address":vars.sql_result distinctBy ($.ADDID) filter( $.ID contains value.ID )map (value1, index1) ->
	{
		"type ":value1.addType,
		number:value1.number,
		street:value1.street,
		City:value1.City,
		Unit:value1.Unit,
		State:value1.State,
		zipcode:value1.zipcode
	}, 
	"Communication":vars.sql_result distinctBy ($.COMID) filter( $.ID contains value.ID )map (value2, index2) ->
	{
		"type":value2.comType,
		value:value2.value,
		preferred: if (value2.preferred) "true" else "false"
	} ,
	 "links":[
	 	{
	      "rel" : "contact",
	      "href" : p('root-url') ++ "/contacts/" ++ value.ID ,
	      "action": "GET"
	 	},
	 	{
	      "rel" : "contact",
	      "href" : p('root-url') ++ "/contacts/" ++  value.ID ,
	      "action" : "DELETE"
	 	},
	 	{
	      "rel" : "contact",
	      "href" : p('root-url') ++ "/contacts/" ++  value.ID ,
	      "action" : "PUT"
	 	}
	 ]
	 

}