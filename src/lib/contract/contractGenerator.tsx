// src/lib/contract/contractGenerator.ts
import { ContractFormData } from "@/types/contract";

export const generateContract = (formData: ContractFormData): string => {
	const currentDate = new Date().toLocaleDateString("en-GB");
	const contractId = `FS-${Date.now().toString().slice(-6)}`;

	return `FLAT SWAP AGREEMENT
Contract ID: ${contractId}
Agreement Date: ${currentDate}
Platform: FlatSwaps (www.flatswaps.com)

═══════════════════════════════════════════════════════════════

PARTY A (INITIATING TENANT):
Full Name: ${formData.tenant1Name}
Email Address: ${formData.tenant1Email}
Phone Number: ${formData.tenant1Phone}

Property Details:
Address: ${formData.property1Address}
Description: ${formData.property1Description}
Monthly Rent: €${formData.property1Rent}

═══════════════════════════════════════════════════════════════

PARTY B (RESPONDING TENANT):
Full Name: ${formData.tenant2Name}
Email Address: ${formData.tenant2Email}
Phone Number: ${formData.tenant2Phone}

Property Details:
Address: ${formData.property2Address}
Description: ${formData.property2Description}
Monthly Rent: €${formData.property2Rent}

═══════════════════════════════════════════════════════════════

SWAP ARRANGEMENT DETAILS:
Start Date: ${formData.startDate}
End Date: ${formData.endDate}
Duration: ${formData.duration}
Arrangement Type: Temporary Flat Swap

═══════════════════════════════════════════════════════════════

TERMS AND CONDITIONS:

1. RENTAL PAYMENT STRUCTURE:
   - Party A will pay €${formData.property2Rent}/month for Party B's property
   - Party B will pay €${formData.property1Rent}/month for Party A's property
   - Payments to be made directly to respective landlords or as arranged
   - First payment due before move-in date

2. PROPERTY CONDITION & CARE:
   - Both properties must be returned in original condition
   - Normal wear and tear is expected and acceptable
   - Both parties responsible for any damages beyond normal wear
   - Inventory check-in and check-out to be documented with photos
   - Any existing damages should be noted before swap begins

3. UTILITIES & SERVICES:
   - Each party responsible for utilities during their occupancy period
   - Includes: electricity, gas, water, internet, heating, and other services
   - Any existing utility contracts to be transferred or new arrangements made
   - Both parties to provide meter readings at start and end of swap

4. KEYS & ACCESS:
   - Key exchange to be coordinated between parties
   - Emergency contact information must be provided by both parties
   - Access codes, alarm systems, and special instructions to be shared
   - Spare keys location and neighbor contacts to be communicated

5. DEPOSITS & SECURITY:
   - Original security deposits remain with respective landlords
   - Any additional security arrangements to be agreed upon separately
   - Both parties recommended to take photos of property condition

6. INSURANCE & LIABILITY:
   - Each party responsible for their personal belongings and actions
   - Both parties advised to maintain appropriate insurance coverage
   - Neither party liable for issues arising from the other's property
   - Any accidents or damages to be reported immediately

7. EARLY TERMINATION:
   - 30-day written notice required for early termination
   - Both parties must agree to any changes to original terms
   - Properties must be vacated and returned promptly upon termination
   - Any costs incurred due to early termination to be discussed

8. COMMUNICATION & SUPPORT:
   - Both parties agree to maintain open and respectful communication
   - Property issues should be reported promptly to avoid complications
   - Contact information must remain current throughout swap period
   - FlatSwaps platform available for mediation if needed

9. COMPLIANCE & LEGAL:
   - Both parties responsible for compliance with local housing laws
   - Any subletting restrictions to be respected and disclosed
   - Landlord permissions obtained where required
   - Local regulations and building rules to be followed

10. ADDITIONAL TERMS:
${formData.specialTerms || "No additional terms specified."}

═══════════════════════════════════════════════════════════════

ACKNOWLEDGMENT & SIGNATURES:

By signing below, both parties acknowledge they have read, understood, and agree to be bound by the terms of this agreement.

Party A (${formData.tenant1Name}):
Signature: _________________________________ 
Date: _____________

Party B (${formData.tenant2Name}):
Signature: _________________________________ 
Date: _____________

═══════════════════════════════════════════════════════════════

EMERGENCY CONTACTS:

Party A Emergency Contact: 
Name: _________________________________
Phone: ________________________________

Party B Emergency Contact:
Name: _________________________________
Phone: ________________________________

═══════════════════════════════════════════════════════════════

CONTRACT DETAILS:
Generated via: FlatSwaps Platform (www.flatswaps.com)
Contract ID: ${contractId}
Generation Date: ${currentDate}
Support Email: support@flatswaps.com

DISCLAIMER: This is a template agreement created to facilitate flat swaps between users. 
Both parties are strongly advised to:
- Consult with legal professionals before signing
- Ensure compliance with local housing laws and regulations
- Obtain necessary permissions from landlords where required
- Review and understand all terms before proceeding

FlatSwaps provides this template as a convenience but accepts no responsibility 
for legal compliance or enforceability. Users proceed at their own discretion.`;
};

export const downloadContract = (formData: ContractFormData): void => {
	const contract = generateContract(formData);
	const blob = new Blob([contract], { type: "text/plain" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `flat-swap-contract-${formData.tenant1Name.replace(/\s+/g, "-").toLowerCase()}-${formData.tenant2Name
		.replace(/\s+/g, "-")
		.toLowerCase()}-${new Date().toISOString().split("T")[0]}.txt`;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
};
