//solium-disable linebreak-style
pragma solidity >=0.5.0;
contract dcare{
    struct Doctor {
        uint id;
        string username;
        string password;
        address add;
        uint[] allocatePatients;
    }
    struct Prescription {
        uint id;
        string message;
        uint[5] medicine;
    }
    struct Patient {
        string username;
        string password;
        uint id;
        uint[] prescriptionIds;
    }
    struct Pharmacist {
        address add;
        }
    struct Manufacturer {
        address add;
    }

    uint idGlobalPatient = 0;
    uint idGlobalDoctor = 0;
    uint idGlobalPrescription = 0;
    Patient[] public registeredPatients;
    Doctor[] public registeredDoctors;
    uint[5] public Medicine;
    bool[] public isDelivered;
    Prescription[] allPrescriptions;
    Manufacturer Manufacturer1;
    Pharmacist Pharmacist1;

    function registerPatient (string memory uname,string memory psd, uint idd) public
    {
        Patient memory p;
        p.username = uname;
        p.password = psd;
        p.id = idGlobalPatient;
        idGlobalPatient++;
        registeredPatients.push(p);
        registeredDoctors[idd].allocatePatients.push(p.id);

    }

    function registerDoctor (address add, string memory uname, string memory psd ) public
    {
        Doctor memory d;
        d.username = uname;
        d.password = psd;
        d.add = add;
        d.id = idGlobalDoctor;
        idGlobalDoctor++;
        registeredDoctors.push(d);

    }

    constructor () public {
        registerDoctor(0x2EE4BEf611eeDFe1822169Bdcb18247CC27BbbcE,"DrRM","Mishra");
        registerDoctor(0xc10FDEA8aEA67Fee221FE47b4f0A1703cbB5D491,"DrMK","Kumawat");
        Manufacturer1.add = 0x443D7a509A5859BE26fD5E2e60feC30d7E6f3AdF;
        Pharmacist1.add = 0x22f5B24222210B8ef09c21E563EA861253211979;
        registerPatient("Rishabh","Mishra",0);
        registerPatient("Manish","Kumawat",0);
    }
    function referPatient (uint idd, uint idp) public
    {
        registeredDoctors[idd].allocatePatients.push(idp);
    }
    function check(uint idd,uint i) public view returns(uint) {
        return registeredDoctors[idd].allocatePatients[i];
    }
    function updateMedicine(uint a,uint b,uint c,uint d,uint e) public {
        Medicine[0] += a;
        Medicine[1] += b;
        Medicine[2] += c;
        Medicine[3] += d;
        Medicine[4] += e;
    }

    function generatePrescription(string memory m,uint idp,uint a,uint b,uint c,uint d,uint e) public {
        Prescription memory p;
        registeredPatients[idp].prescriptionIds.push(idGlobalPrescription);
        p.message = m;
        p.medicine[0] = a;
        p.medicine[1] = b;
        p.medicine[2] = c;
        p.medicine[3] = d;
        p.medicine[4] = e;
        Medicine[0] -= a;
        Medicine[1] -= b;
        Medicine[2] -= c;
        Medicine[3] -= d;
        Medicine[4] -= e;
        p.id = idGlobalPrescription;
        idGlobalPrescription++;
        isDelivered.push(false);
    }

    function provideMedicine(uint idpres) public returns(bool)
    {
        require(msg.sender==Pharmacist1.add,"You are not authorised");
        if(isDelivered[idpres]==true)
        {
            return false;
        }
        else
        {
            isDelivered[idpres] = true;
            return true;
        }
    }

    function getMedicine(uint i) public view returns(uint)
    {
        uint medval = Medicine[i];
        return medval;
    }
    function checkUser (address user) public view returns(string memory)
    {
        string memory res;
        bool flag = false;
        for(uint i = 0;i < registeredDoctors.length; i++)
        {  
            if(user==registeredDoctors[i].add)
            {res = registeredDoctors[i].username;flag = true;}
        }
        if(flag == true)
        {return res;}
        else if(user == Manufacturer1.add)
        {return "Manufacturer";}
        else if(user == Pharmacist1.add)
        {return "Pharmacist1";}
        else
        {return "Viewers";}
    }

}