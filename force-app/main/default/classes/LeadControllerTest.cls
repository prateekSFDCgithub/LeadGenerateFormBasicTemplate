@isTest
public class LeadControllerTest {
@isTest
static void testCreateLead() {
    String firstName = 'John';
    String lastName = 'Doe';
    String phone = '1234567890';
    String email = 'john.doe@example.com';
    String state = 'NY';
    String city = 'New York';
    String country = 'USA';
    String yearsOfInsuranceAgencyExperience = '5';
    String P_CInsuranceSalesExperience = 'Yes';
    String captiveAgentExperience = 'No';
    String franchiseProgramSource = 'Referral';
    String primaryBusiness = 'Yes';
    String availableCapital = '50000';
    String franchiseState = 'NY';
    String experienceReason = 'Looking to expand';

    Test.startTest();
    Lead createdLead = LeadController.createLead(firstName, lastName, phone, email, state, city, country, 
        yearsOfInsuranceAgencyExperience, P_CInsuranceSalesExperience, captiveAgentExperience, 
        franchiseProgramSource, primaryBusiness, availableCapital, franchiseState, experienceReason);
    Test.stopTest();
}
}