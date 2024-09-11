global without sharing class LeadController {
    @AuraEnabled
    global static Lead createLead(String firstName, String lastName, String phone, string email, string state,string city, string country, string yearsOfInsuranceAgencyExperience,
    string P_CInsuranceSalesExperience, string captiveAgentExperience, string franchiseProgramSource, string primaryBusiness, string availableCapital, string franchiseState, string experienceReason ) {
        Lead newLead = new Lead(
            FirstName = firstName,
            LastName = lastName,
            Phone = phone,
            Email = email,
            country = country,
            state = state,
            city = city,
            Will_this_be_your_primary_business_or_on__c = primaryBusiness,
            In_what_state_would_you_operate_your_Ass__c = franchiseState,
            Have_you_ever_been_a_captive_Agent__c= captiveAgentExperience,
            Do_you_have_P_C_Insurance_Sales_Experien__c = P_CInsuranceSalesExperience,
            Available_Capital_to_Invest__c = captiveAgentExperience,
            How_did_you_hear_about_the_Assurean_fran__c = franchiseProgramSource,
            Years_of_Insurance_Agency_experience__c = yearsOfInsuranceAgencyExperience,
            Please_tell_us_more_about_your_experienc__c = experienceReason,
            recordtypeID = '012Ea000001gh6PIAQ'

        );
        insert newLead;
        return newLead;
    }
    }