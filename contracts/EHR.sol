// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0;

import "./Roles.sol";

contract EHR {

    using Roles for Roles.Role;
    Roles.Role private admin;
    Roles.Role private doctor;
    Roles.Role private patient;

    struct Doctor {
        address id;
        string drHash;
    }

    struct Patient {
        address id;
        string name;
        string age;
        string sex;
        string description;
        string ipfsHash;
    }

    mapping(address => Doctor) private Doctors;
    mapping(address => Patient) private Patients;

    address[] public DrIDs;
    address[] public PatientIDs;

    constructor() {
        admin.add(msg.sender);
    }

    modifier onlyAdmin() {
        require(admin.has(msg.sender), "Only for admin");
        _;
    }

    modifier onlyDoctor() {
        require(doctor.has(msg.sender), "Only for doctors");
        _;
    }

    modifier onlyPatient() {
        require(patient.has(msg.sender), "Only for patients");
        _;
    }

    function isAdmin() public view returns (bool) {
        return admin.has(msg.sender);
    }

    function addDoctor(address dr_id, string memory _drInfo_hash) public onlyAdmin {
        Doctor storage drInfo = Doctors[dr_id];
        drInfo.id = dr_id;
        drInfo.drHash = _drInfo_hash;
        DrIDs.push(dr_id);

        doctor.add(dr_id);
    }

    function isDoctor(address id) public view returns (bool) {
        return doctor.has(id);
    }

    function addPatient(
        string memory _name,
        string memory _age,
        string memory _sex,
        string memory _description,
        string memory _ipfsHash
    ) public onlyDoctor {
        Patient storage patientInfo = Patients[msg.sender];
        patientInfo.id = msg.sender;
        patientInfo.name = _name;
        patientInfo.age = _age;
        patientInfo.sex = _sex;
        patientInfo.description = _description;
        patientInfo.ipfsHash = _ipfsHash;

        PatientIDs.push(msg.sender);
        patient.add(msg.sender);
    }

    function getAllPatients() public onlyAdmin view returns(address[] memory) {
        return PatientIDs;
    }

    function getPatientDetails(address _id) public onlyDoctor view returns (
        string memory,
        string memory,
        string memory,
        string memory,
        string memory
    ) {
        Patient memory patientInfo = Patients[_id];
        return (
            patientInfo.name,
            patientInfo.age,
            patientInfo.sex,
            patientInfo.description,
            patientInfo.ipfsHash
        );
    }

    function isPatient(address id) public view returns (bool) {
        return patient.has(id);
    }
}