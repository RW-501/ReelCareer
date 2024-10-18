

document.getElementById("generateJobDescriptionBtn").addEventListener("click", function() {
    const industries  = Array.from(document.getElementById("industry").selectedOptions).map(option => option.value);
    const jobTitle = document.getElementById("jobTitle").value;
  //  const keySkills = document.getElementById("keySkills").value.split(',').map(skill => skill.trim());
    const jobDescriptionField = document.getElementById("jobDescription");
    const jobRequirementsField = document.getElementById("jobRequirements");

    // Check if a job title and at least one category is selected
    if (industries.length > 0 && jobTitle) {
        const descriptions = {
            "Information Technology": [
                `As a ${jobTitle}, you will be responsible for developing, implementing, and managing cutting-edge IT solutions. You will collaborate with cross-functional teams, including developers, analysts, and project managers, to deliver complex projects on time and within budget. You will be responsible for troubleshooting technical issues, ensuring data security, and optimizing system performance. Your work will involve staying up-to-date with the latest industry trends and technologies to ensure the company's infrastructure remains at the forefront of innovation.`,
                `We are looking for an experienced ${jobTitle} to lead IT projects from conception to completion, ensuring the seamless integration of software, networks, and cloud solutions. You will play a key role in developing IT strategies that align with business goals, fostering innovation and efficiency. As a senior team member, you will mentor junior developers and engineers, ensuring the consistent delivery of high-quality, scalable, and secure solutions.`
            ],
            "Healthcare": [
                `As a ${jobTitle}, you will play a pivotal role in delivering high-quality healthcare services, providing direct patient care and support. Your responsibilities will include diagnosing medical conditions, creating personalized treatment plans, and working closely with a multidisciplinary team of healthcare professionals to ensure optimal patient outcomes. You will also be expected to maintain meticulous patient records, stay current with advances in medical treatments, and continuously improve your skills through ongoing education and professional development.`,
                `We are seeking a dedicated ${jobTitle} to join our team of healthcare professionals. In this role, you will take charge of patient management, oversee clinical operations, and ensure that all healthcare services meet the highest standards of care. You will also have the opportunity to contribute to healthcare policy decisions, engage in community outreach programs, and collaborate with external healthcare organizations to drive better health outcomes at both the individual and community level.`
            ],
            "Finance": [
                `As a ${jobTitle}, you will be responsible for developing and overseeing financial strategies that drive the company's growth and stability. This includes managing budgets, conducting financial forecasts, analyzing market trends, and ensuring compliance with local and international financial regulations. You will work closely with executive leadership to provide financial insights that influence critical business decisions. Your role will also involve managing risk, optimizing investment strategies, and improving financial efficiency through innovative solutions and tools.`,
                `We need a detail-oriented ${jobTitle} to oversee our financial operations, manage day-to-day accounting, and lead financial planning and analysis activities. You will play a key role in evaluating our company's financial performance, preparing reports for investors and stakeholders, and ensuring our financial health remains robust. You will also have opportunities to streamline processes, reduce costs, and contribute to the company's overall strategic direction by providing actionable financial insights.`
            ],
            "Education": [
                `As a ${jobTitle}, you will design, develop, and implement educational programs that cater to diverse learning needs. You will be responsible for creating lesson plans, evaluating student performance, and providing individualized instruction to help students achieve their academic goals. Your role will also include collaborating with fellow educators to develop curricula that adhere to educational standards, incorporating innovative teaching methods, and leveraging technology to enhance the learning experience.`,
                `We are looking for a passionate ${jobTitle} who is dedicated to fostering a positive and inclusive learning environment. In this role, you will mentor and guide students, encourage critical thinking, and contribute to the development of school policies. You will also be involved in extracurricular activities, helping to shape students’ character and social development outside of the classroom. Continuous professional growth is expected, with opportunities to attend workshops, seminars, and further education programs.`
            ],
            "Manufacturing": [
                `As a ${jobTitle}, you will oversee all aspects of the manufacturing process, from initial product design to final production and quality assurance. You will be responsible for improving production efficiency, ensuring compliance with safety and regulatory standards, and reducing waste through lean manufacturing practices. You will collaborate with engineering teams to implement innovative solutions and automation technologies to enhance productivity while maintaining the highest level of product quality.`,
                `We are seeking a skilled ${jobTitle} to lead our manufacturing operations and drive continuous improvement across all production lines. You will manage a team of operators, technicians, and quality control specialists, ensuring that production targets are met while maintaining a safe and efficient work environment. Your role will involve analyzing production data, identifying areas for improvement, and implementing cost-saving measures without compromising on product quality.`
            ],
            "Retail": [
                `As a ${jobTitle}, you will be responsible for overseeing retail operations, ensuring that the store meets its sales targets while providing an exceptional customer experience. You will lead sales teams, manage inventory, and implement merchandising strategies that increase foot traffic and optimize product placement. Additionally, you will analyze consumer behavior, track key performance indicators (KPIs), and implement promotional campaigns to drive sales growth. Your role will also involve managing customer feedback and resolving any operational issues that arise.`,
                `We are looking for a dynamic ${jobTitle} to lead our retail team and transform the shopping experience. You will be at the forefront of implementing new technologies, such as point-of-sale (POS) systems and customer relationship management (CRM) tools, to streamline operations and improve customer engagement. Your leadership will be essential in training staff, fostering a team culture, and ensuring that the store consistently delivers on its brand promise.`
            ],
            "Hospitality": [
                `As a ${jobTitle}, you will be tasked with ensuring that guests have a memorable and positive experience. This will include overseeing daily operations, managing staff, and ensuring that all services meet the highest standards of hospitality. You will be responsible for guest relations, resolving any issues, and constantly looking for ways to enhance guest satisfaction. Additionally, you will manage the hotel's finances, coordinate with other departments, and ensure compliance with health and safety regulations.`,
                `We are seeking a customer-focused ${jobTitle} to oversee hospitality operations, ensuring that our guests receive exceptional service. You will manage a team of front-line employees, including receptionists, concierges, and housekeeping staff, and work closely with other departments to ensure smooth operations. Your role will involve handling VIP guests, organizing events, and driving initiatives that increase customer loyalty and positive reviews.`
            ],
            "Marketing & Advertising": [
                `As a ${jobTitle}, you will be responsible for creating, implementing, and managing marketing campaigns that drive brand awareness, customer engagement, and conversions. You will collaborate with cross-functional teams, including creative, product, and sales teams, to develop multi-channel marketing strategies. Your role will involve conducting market research, analyzing consumer behavior, and optimizing marketing efforts to align with business goals.`,
                `We are looking for a creative and strategic ${jobTitle} to lead our marketing efforts and position our brand as a market leader. You will work on everything from digital advertising to content marketing, focusing on ROI and metrics such as customer acquisition cost (CAC) and lifetime value (LTV). You will also be responsible for developing branding guidelines, managing relationships with advertising agencies, and using data analytics to refine marketing strategies.`
            ],
            "Construction": [
                `As a ${jobTitle}, you will manage all aspects of construction projects, from pre-construction planning to post-construction completion. You will work closely with architects, engineers, contractors, and clients to ensure that projects are delivered on time, within scope, and on budget. Your responsibilities will include overseeing project scheduling, budgeting, safety compliance, and quality control, ensuring all construction activities meet industry standards and client expectations.`,
                `We are seeking a detail-oriented ${jobTitle} to lead our construction projects, focusing on building efficiency, safety, and client satisfaction. You will be responsible for managing project teams, liaising with external vendors and subcontractors, and handling procurement and logistics. Your role will also involve risk management, ensuring all legal requirements are met, and troubleshooting any issues that arise during construction to ensure seamless project execution.`
            ],
            "Transportation & Logistics": [
                `As a ${jobTitle}, you will oversee logistics operations, including transportation, warehousing, and distribution to ensure the efficient movement of goods and materials. You will be responsible for optimizing transportation routes, managing supply chain costs, and ensuring timely deliveries. In this role, you will also implement and monitor logistics software and technologies to enhance operational efficiency and reduce waste.`,
                `We are looking for an organized ${jobTitle} to manage our transportation and logistics operations. You will be tasked with improving supply chain performance, managing vendor relationships, and ensuring that shipments are delivered on time while minimizing costs. Your expertise will be crucial in streamlining operations, improving communication across departments, and ensuring customer satisfaction by maintaining service level agreements (SLAs).`
            ],
            "Real Estate": [
                `As a ${jobTitle}, you will be responsible for overseeing real estate transactions, including property sales, purchases, and leasing. You will work with clients to identify their needs, conduct market research, and advise them on real estate investments. Your role will involve negotiating contracts, managing property listings, and ensuring that all transactions comply with legal and regulatory requirements.`,
                `We are seeking a motivated ${jobTitle} to join our real estate team. In this role, you will lead efforts to acquire, sell, and lease properties, managing the full transaction lifecycle. You will be responsible for building strong relationships with clients, analyzing market trends, and providing them with expert advice. You will also manage property portfolios, ensuring that properties are maintained, and rental agreements are enforced.`
            ],
            "Telecommunications": [
                `As a ${jobTitle}, you will be responsible for managing and maintaining telecommunications systems and infrastructure. Your duties will include designing, implementing, and troubleshooting telecom networks, ensuring they meet performance, reliability, and security standards. You will also collaborate with network engineers and technical support teams to ensure uninterrupted communication services for clients and end-users.`,
                `We are looking for a technical ${jobTitle} to oversee telecommunications projects, from upgrading existing networks to rolling out new telecom services. You will be involved in planning, budgeting, and ensuring compliance with industry regulations and standards. Your role will also involve working with cutting-edge technologies, such as 5G networks, to ensure our telecommunications infrastructure remains at the forefront of innovation.`
            ],
            "Non-Profit": [
                `As a ${jobTitle}, you will be responsible for advancing the organization's mission by managing key programs, donor relationships, and community outreach efforts. You will be tasked with creating strategies to increase fundraising, organizing events, and overseeing volunteers and staff. Your role will involve building partnerships with other non-profit organizations, foundations, and community leaders to enhance the impact of the organization’s initiatives.`,
                `We are seeking a passionate ${jobTitle} to join our non-profit organization. In this role, you will lead initiatives aimed at addressing critical social issues, manage relationships with stakeholders, and ensure that programs align with the organization's mission. You will also be responsible for developing and implementing fundraising strategies, managing budgets, and ensuring that resources are effectively allocated to maximize impact.`
            ],
            "Legal": [
                `As a ${jobTitle}, you will provide expert legal counsel on a wide range of matters, including contracts, regulatory compliance, and dispute resolution. You will be responsible for drafting, reviewing, and negotiating legal agreements, representing clients in court, and providing strategic advice to minimize legal risks. Your role will also involve staying informed about changes in the law and how they may affect your clients or the organization.`,
                `We are looking for a qualified ${jobTitle} to handle complex legal issues, offering both advisory and litigation support to our clients. You will manage cases from inception to resolution, working on matters such as corporate governance, mergers and acquisitions, intellectual property, and employment law. Your expertise will be key in ensuring that clients are compliant with the law while protecting their interests in legal disputes.`
            ],
            "Energy & Utilities": [
                `As a ${jobTitle}, you will be responsible for managing energy generation, distribution, and consumption processes with a focus on sustainability and cost efficiency. You will oversee the operation of energy plants, analyze usage patterns, and work on projects that involve renewable energy sources. Additionally, you will ensure compliance with government regulations and environmental standards while driving innovation in energy technologies.`,
                `We are seeking an experienced ${jobTitle} to lead projects in the energy and utilities sector. Your role will involve optimizing the use of energy resources, developing energy-saving initiatives, and driving the transition to greener energy solutions. You will also be responsible for maintaining grid reliability, managing budgets, and coordinating with external stakeholders to ensure a consistent and efficient energy supply.`
            ],
            "Media & Entertainment": [
                `As a ${jobTitle}, you will create engaging content and manage media projects that resonate with target audiences. You will collaborate with creative teams to produce high-quality entertainment across various platforms, including film, television, radio, and digital media. Your responsibilities will include content creation, production management, and post-production editing, ensuring that projects are completed on time and within budget.`,
                `We are looking for a creative and visionary ${jobTitle} to lead media and entertainment projects from concept to execution. You will work closely with writers, directors, and production teams to develop content that captivates audiences and drives viewership. Your role will also involve negotiating contracts, managing talent, and ensuring that the final product meets both creative and commercial goals.`
            ],
            "Human Resources": [
                `As a ${jobTitle}, you will manage all aspects of human resources, including talent acquisition, employee relations, performance management, and compliance with labor laws. You will develop and implement HR policies that foster a positive work environment, improve employee satisfaction, and support the company’s strategic goals. Your responsibilities will also include managing payroll, benefits, and training programs to ensure the professional development of all employees.`,
                `We are seeking a skilled ${jobTitle} to oversee our human resources operations. You will play a key role in recruiting top talent, managing employee retention initiatives, and ensuring that the company remains compliant with employment regulations. You will also drive HR initiatives, such as diversity and inclusion programs, employee engagement surveys, and leadership development programs, that support organizational growth.`
            ],
            "Automotive": [
                `As a ${jobTitle}, you will manage the design, production, and quality control of automotive components and vehicles. You will collaborate with engineers, suppliers, and production teams to ensure that vehicles meet safety, performance, and regulatory standards. Your role will involve overseeing the assembly process, implementing lean manufacturing techniques, and driving innovation in automotive technology.`,
                `We are seeking a technical ${jobTitle} to lead automotive projects that focus on improving vehicle performance, safety, and environmental sustainability. You will be responsible for managing R&D efforts, working with cross-functional teams to introduce new features and technologies, and ensuring that all vehicles adhere to industry regulations. You will also oversee the testing and validation process, ensuring that every vehicle meets the highest quality standards before it reaches the market.`
            ],
            "Aerospace": [
                `As a ${jobTitle}, you will be involved in the design, development, and testing of aerospace systems, including aircraft, satellites, and space exploration technologies. Your role will involve collaborating with engineers and scientists to create innovative aerospace solutions that meet safety, performance, and regulatory requirements. You will also be responsible for managing budgets, timelines, and resources to ensure the successful completion of aerospace projects.`,
                `We are seeking a highly technical ${jobTitle} to lead aerospace projects that push the boundaries of innovation and safety. You will be responsible for overseeing the entire lifecycle of aerospace systems, from conceptual design to final testing and deployment. Your expertise will be essential in ensuring that all aerospace technologies meet rigorous safety standards and regulatory requirements while delivering on performance objectives.`
            ],
        };










        const requirements = {
            "Information Technology": [
                "Proven experience in software development and coding.",
                "Strong problem-solving and communication skills.",
                "Knowledge of IT infrastructure and security.",
                "Familiarity with database management systems and cloud technologies.",
                "Ability to work in an agile development environment."
            ],
            "Healthcare": [
                "Licensed healthcare professional with relevant certifications.",
                "Strong interpersonal and patient care skills.",
                "Experience in healthcare management or medical services.",
                "Knowledge of healthcare regulations and compliance standards.",
                "Ability to work collaboratively in a team-oriented environment."
            ],
            "Finance": [
                "Experience in financial planning, budgeting, and analysis.",
                "Strong analytical and problem-solving skills.",
                "Knowledge of financial regulations and compliance.",
                "Familiarity with financial modeling and forecasting techniques.",
                "Excellent communication and interpersonal skills."
            ],
            "Education": [
                "Bachelor's degree in Education or relevant field.",
                "Experience in curriculum development and instructional design.",
                "Strong communication and teaching skills.",
                "Ability to work with diverse groups of students.",
                "Knowledge of educational technologies and tools."
            ],
            "Manufacturing": [
                "Experience in manufacturing processes and quality control.",
                "Strong problem-solving skills and attention to detail.",
                "Knowledge of safety regulations and compliance.",
                "Ability to work with production teams to improve efficiency.",
                "Familiarity with lean manufacturing principles."
            ],
            "Retail": [
                "Experience in retail management or sales.",
                "Strong customer service and communication skills.",
                "Ability to analyze sales data and market trends.",
                "Knowledge of inventory management and merchandising.",
                "Strong leadership skills and ability to motivate a team."
            ],
            "Hospitality": [
                "Experience in hospitality management or guest services.",
                "Strong communication and interpersonal skills.",
                "Ability to manage multiple tasks and prioritize effectively.",
                "Knowledge of food safety and hygiene regulations.",
                "Strong customer service orientation."
            ],
            "Marketing & Advertising": [
                "Experience in developing and executing marketing strategies.",
                "Strong creative and analytical skills.",
                "Familiarity with digital marketing tools and analytics.",
                "Excellent communication and presentation skills.",
                "Ability to manage budgets and measure ROI."
            ],
            "Construction": [
                "Experience in project management and construction processes.",
                "Strong knowledge of building codes and regulations.",
                "Ability to read and interpret blueprints and technical drawings.",
                "Strong leadership and team management skills.",
                "Excellent problem-solving abilities and attention to detail."
            ],
            "Transportation & Logistics": [
                "Experience in logistics and supply chain management.",
                "Strong organizational and problem-solving skills.",
                "Knowledge of transportation regulations and compliance.",
                "Ability to manage budgets and optimize routes.",
                "Strong communication skills for coordinating with vendors and clients."
            ],
            "Real Estate": [
                "Licensed real estate agent or broker with relevant experience.",
                "Strong negotiation and sales skills.",
                "Knowledge of local real estate markets and trends.",
                "Ability to analyze property values and investment opportunities.",
                "Excellent communication and interpersonal skills."
            ],
            "Telecommunications": [
                "Experience in telecommunications systems and infrastructure.",
                "Strong technical and problem-solving skills.",
                "Knowledge of network design and implementation.",
                "Ability to manage projects and work with cross-functional teams.",
                "Excellent communication skills for technical support and customer interaction."
            ],
            "Non-Profit": [
                "Experience in non-profit management and program development.",
                "Strong fundraising and grant writing skills.",
                "Ability to build and maintain relationships with stakeholders.",
                "Knowledge of community engagement strategies.",
                "Excellent communication and organizational skills."
            ],
            "Legal": [
                "Licensed attorney with experience in relevant legal areas.",
                "Strong research and analytical skills.",
                "Ability to draft legal documents and contracts.",
                "Excellent negotiation and communication skills.",
                "Knowledge of legal compliance and risk management."
            ],
            "Energy & Utilities": [
                "Experience in energy management or utilities operations.",
                "Strong analytical and problem-solving skills.",
                "Knowledge of renewable energy technologies and regulations.",
                "Ability to manage projects and work with diverse teams.",
                "Excellent communication skills for stakeholder engagement."
            ],
            "Media & Entertainment": [
                "Experience in media production or content creation.",
                "Strong creative and storytelling skills.",
                "Knowledge of media regulations and compliance.",
                "Ability to manage projects and collaborate with creative teams.",
                "Excellent communication and networking skills."
            ],
            "Human Resources": [
                "Experience in HR management and recruitment.",
                "Strong knowledge of labor laws and compliance.",
                "Excellent communication and interpersonal skills.",
                "Ability to handle confidential information with discretion.",
                "Strong organizational skills and attention to detail."
            ],
            "Automotive": [
                "Experience in automotive engineering or manufacturing.",
                "Strong technical and problem-solving skills.",
                "Knowledge of automotive safety and quality standards.",
                "Ability to manage projects and work with engineering teams.",
                "Excellent communication skills for liaising with suppliers and clients."
            ],
            "Aerospace": [
                "Experience in aerospace engineering or project management.",
                "Strong technical skills and attention to detail.",
                "Knowledge of aerospace regulations and compliance standards.",
                "Ability to work in cross-functional teams and manage projects.",
                "Excellent problem-solving skills for complex engineering challenges."
            ],
            "Agriculture": [
                "Experience in agricultural management or farming operations.",
                "Strong knowledge of crop production and sustainable practices.",
                "Ability to analyze data and implement best practices.",
                "Excellent communication and leadership skills.",
                "Knowledge of agricultural regulations and compliance standards."
            ],
            "Consulting": [
                "Experience in business consulting or strategy development.",
                "Strong analytical and problem-solving skills.",
                "Excellent communication and presentation skills.",
                "Ability to work with diverse clients and industries.",
                "Knowledge of market research and data analysis techniques."
            ]
        };
        
        // Select random descriptions and requirements based on the selected industries
        const randomDescription = industries.map(industry => {
            const industryDescriptions = descriptions[industry] || [];
            return industryDescriptions[Math.floor(Math.random() * industryDescriptions.length)];
        }).filter(desc => desc).join(" ");

        const randomRequirements = industries.map(industry => {
            const industryRequirements = requirements[industry] || [];
            return industryRequirements.length > 0 ? `<ul>${industryRequirements.map(req => `<li>${req}</li>`).join('')}</ul>` : '';
        }).filter(req => req).join("");

        // Insert the generated content into the respective fields
        jobDescriptionField.value = randomDescription;
        jobRequirementsField.value = `Key Requirements: ${randomRequirements}`;

    } else {
        alert("Please select at least one industry and enter a job title.");
    }
});