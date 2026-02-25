private CompanyDTO getCompany(String company) {
    String url = "http://company-service/api/company/name/";
    CompanyDTO companyDTO = restTemplate.getForObject(url + company, CompanyDTO.class);
    if (companyDTO == null) {
        throw new EntityNotFoundException("Company not found: ", company);
    }
    return companyDTO;
}
