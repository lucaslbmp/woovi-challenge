
// Import Prisma Client
const { PrismaClient } = require('@prisma/client');

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define the main function that will handle database operations
async function main() {
    await prisma.paymentOption.createMany({
        data: [
                {
                    value: "opt1",
                    numberOfInstallments: 1,
                    installmentValue: 30500,
                    highlighted: "Ganhe 3% de Cashback",
                    tip_highlight: "300,00",
                    tip_text: "🤑 300,00 de volta no seu Pix na hora"
                },
                {
                    value: "opt2",
                    numberOfInstallments: 2,
                    installmentValue: 15300,
                    total: 30600,
                },
            
                {
                    value: "opt3",
                    numberOfInstallments: 3,
                    installmentValue: 10196.66,
                    total: 30620,
                },
            
                {
                    value: "opt4",
                    numberOfInstallments: 4,
                    installmentValue: 7725,
                    tip_highlight: "-3% de juros:",
                    tip_text: "-3% de juros: Melhor opção de parcelamento",
                    total: 30900,
                },
            
                {
                    value: "opt5",
                    numberOfInstallments: 5,
                    installmentValue: 6300,
                    total: 31500,
                },
            
                {
                    value: "opt6",
                    numberOfInstallments: 6,
                    installmentValue: 5283.33,
                    total: 31699.98,
                },
            
                {
                    value: "opt7",
                    numberOfInstallments: 7,
                    installmentValue: 4545.85,
                    total: 31800,
                },
        ]
    });

    const _id = 998;
	const payment1 = await prisma.payment.create({
		data: {
            id: _id,
            downpayment:       10196.66,
            downpaymentStatus:  "open",
            total             :  30620.00,
            installments: {
                create: [
                    {value: 10196.66, completed: false},
                    {value: 10196.66, completed: false},
                ]
            }
		},
	});

	// Output the email of the newly created user
	console.log(`Created user: ${payment1.id}`);
}

// Execute the main function and handle disconnection and errors
main()
	.then(() => prisma.$disconnect()) // Disconnect from the database on successful completion
	.catch(async (e) => {
		console.error(e); // Log any errors
		await prisma.$disconnect(); // Ensure disconnection even if an error occurs
		process.exit(1); // Exit the process with an error code
	});