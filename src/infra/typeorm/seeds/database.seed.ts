import { DataSource } from 'typeorm';
import { Department } from '../../../app/modules/department/entities/department.entity';
import { Document } from '../../../app/modules/document/entities/document.entity';
import { Person } from '../../../app/modules/person/entities/person.entity';
import { Tool } from '../../../app/modules/tool/entities/tool.entity';

export async function runSeed(dataSource: DataSource) {
    console.log('🌱 Starting database seeding...');

    const departmentRepository = dataSource.getRepository(Department);
    const documentRepository = dataSource.getRepository(Document);
    const toolRepository = dataSource.getRepository(Tool);
    const personRepository = dataSource.getRepository(Person);

    // Clean existing data (optional - only if there are existing records)
    try {
        await personRepository.clear();
        await toolRepository.clear();
        await documentRepository.clear();
        await departmentRepository.clear();
    } catch (error) {
        console.log('⚠️  No existing data to clean');
    }

    // 1. SEED DEPARTMENTS (5 departments)
    console.log('📁 Seeding departments...');
    const departmentCount = await departmentRepository.count();

    if (departmentCount === 0) {
        const departments = [
            {
                name: 'Recursos Humanos',
                code: 'RH',
                description: 'Responsável pela gestão de pessoas, recrutamento, seleção e desenvolvimento de colaboradores',
                color: 'blue',
                icon: 'FiUsers',
            },
            {
                name: 'Tecnologia da Informação',
                code: 'TI',
                description: 'Gerencia toda infraestrutura tecnológica, desenvolvimento de sistemas e suporte técnico',
                color: 'purple',
                icon: 'FiCpu',
            },
            {
                name: 'Financeiro',
                code: 'FIN',
                description: 'Controla fluxo de caixa, contas a pagar e receber, orçamento e planejamento financeiro',
                color: 'green',
                icon: 'FiDollarSign',
            },
            {
                name: 'Comercial',
                code: 'COM',
                description: 'Responsável pelas vendas, relacionamento com clientes e expansão de mercado',
                color: 'orange',
                icon: 'FiTrendingUp',
            },
            {
                name: 'Operações',
                code: 'OPS',
                description: 'Gerencia processos operacionais, logística e entrega de produtos/serviços',
                color: 'red',
                icon: 'FiPackage',
            },
        ];

        for (const dept of departments) {
            await departmentRepository.save(dept);
        }
        console.log('✅ 5 departments created!');
    } else {
        console.log('⏭️  Departments already exist, skipping...');
    }

    // 2. SEED DOCUMENTS (3 documents)
    console.log('📄 Seeding documents...');
    const documentCount = await documentRepository.count();

    if (documentCount === 0) {
        const documents = [
            {
                title: 'Manual de Procedimentos Operacionais',
                description: 'Documento completo com todos os procedimentos operacionais padrão da empresa',
                url: 'https://docs.google.com/document/manual-procedimentos',
            },
            {
                title: 'Política de Segurança da Informação',
                description: 'Diretrizes e normas de segurança para proteção de dados e informações corporativas',
                url: 'https://docs.google.com/document/politica-seguranca',
            },
            {
                title: 'Código de Conduta e Ética',
                description: 'Princípios éticos e comportamentais esperados de todos os colaboradores',
                url: 'https://docs.google.com/document/codigo-conduta',
            },
        ];

        for (const doc of documents) {
            await documentRepository.save(doc);
        }
        console.log('✅ 3 documents created!');
    } else {
        console.log('⏭️  Documents already exist, skipping...');
    }

    // 3. SEED TOOLS (11 tools)
    console.log('🛠️  Seeding tools...');
    const tools = [
        {
            name: 'Jira',
            normalizedName: 'jira',
            description: 'Ferramenta de gestão de projetos ágeis e rastreamento de issues',
            url: 'https://jira.atlassian.com',
        },
        {
            name: 'Slack',
            normalizedName: 'slack',
            description: 'Plataforma de comunicação e colaboração em equipe',
            url: 'https://slack.com',
        },
        {
            name: 'GitHub',
            normalizedName: 'github',
            description: 'Plataforma de hospedagem de código e versionamento com Git',
            url: 'https://github.com',
        },
        {
            name: 'Figma',
            normalizedName: 'figma',
            description: 'Ferramenta colaborativa de design de interfaces e prototipagem',
            url: 'https://figma.com',
        },
        {
            name: 'Google Workspace',
            normalizedName: 'googleworkspace',
            description: 'Suite de produtividade com Gmail, Drive, Docs, Sheets e Meet',
            url: 'https://workspace.google.com',
        },
        {
            name: 'Notion',
            normalizedName: 'notion',
            description: 'Ferramenta de documentação, wiki e gestão de conhecimento',
            url: 'https://notion.so',
        },
        {
            name: 'Trello',
            normalizedName: 'trello',
            description: 'Ferramenta de gestão visual de tarefas usando metodologia Kanban',
            url: 'https://trello.com',
        },
        {
            name: 'Zoom',
            normalizedName: 'zoom',
            description: 'Plataforma de videoconferência e reuniões online',
            url: 'https://zoom.us',
        },
        {
            name: 'Salesforce',
            normalizedName: 'salesforce',
            description: 'CRM para gestão de relacionamento com clientes e vendas',
            url: 'https://salesforce.com',
        },
        {
            name: 'SAP',
            normalizedName: 'sap',
            description: 'Sistema integrado de gestão empresarial (ERP)',
            url: 'https://sap.com',
        },
        {
            name: 'Tableau',
            normalizedName: 'tableau',
            description: 'Plataforma de análise de dados e business intelligence',
            url: 'https://tableau.com',
        },
    ];

    const toolCount = await toolRepository.count();

    if (toolCount === 0) {
        for (const tool of tools) {
            await toolRepository.save(tool);
        }
        console.log('✅ 11 tools created!');
    } else {
        console.log('⏭️  Tools already exist, skipping...');
    }

    // 4. SEED PEOPLE (20 people)
    console.log('👥 Seeding people...');
    const people = [
        { name: 'Ana Silva', email: 'anasilva@gmail.com', role: 'Gerente de RH' },
        { name: 'Bruno Santos', email: 'brunosantos@gmail.com', role: 'Desenvolvedor Full Stack' },
        { name: 'Carla Oliveira', email: 'carlaoliveira@gmail.com', role: 'Analista Financeiro' },
        { name: 'Daniel Costa', email: 'danielcosta@gmail.com', role: 'Vendedor Senior' },
        { name: 'Eduarda Lima', email: 'eduardalima@gmail.com', role: 'Coordenadora de Operações' },
        { name: 'Fernando Alves', email: 'fernandoalves@gmail.com', role: 'Analista de Sistemas' },
        { name: 'Gabriela Rocha', email: 'gabrielarocha@gmail.com', role: 'Designer UX/UI' },
        { name: 'Henrique Martins', email: 'henriquemartins@gmail.com', role: 'Contador' },
        { name: 'Isabel Ferreira', email: 'isabelferreira@gmail.com', role: 'Gerente Comercial' },
        { name: 'João Pedro', email: 'joaopedro@gmail.com', role: 'Engenheiro de Software' },
        { name: 'Larissa Souza', email: 'larissasouza@gmail.com', role: 'Analista de RH' },
        { name: 'Marcelo Dias', email: 'marcelodias@gmail.com', role: 'Coordenador de TI' },
        { name: 'Natália Gomes', email: 'nataliagomes@gmail.com', role: 'Controller' },
        { name: 'Otávio Ribeiro', email: 'otavioribeiro@gmail.com', role: 'Executivo de Vendas' },
        { name: 'Paula Mendes', email: 'paulamendes@gmail.com', role: 'Supervisora de Operações' },
        { name: 'Rafael Castro', email: 'rafaelcastro@gmail.com', role: 'DevOps Engineer' },
        { name: 'Sabrina Cardoso', email: 'sabrinacardoso@gmail.com', role: 'Analista de Marketing' },
        { name: 'Thiago Barbosa', email: 'thiagobarbosa@gmail.com', role: 'Auditor Financeiro' },
        { name: 'Vanessa Pinto', email: 'vanessapinto@gmail.com', role: 'Product Manager' },
        { name: 'Wellington Araújo', email: 'wellingtonaraujo@gmail.com', role: 'Gerente de Operações' },
    ];

    const personCount = await personRepository.count();

    if (personCount === 0) {
        for (const person of people) {
            await personRepository.save(person);
        }
        console.log('✅ 20 people created!');
    } else {
        console.log('⏭️  People already exist, skipping...');
    }

    console.log('');
    console.log('🎉 Database seeding completed successfully!');
    console.log('📊 Summary:');
    console.log('   - 5 Departments');
    console.log('   - 3 Documents');
    console.log('   - 11 Tools');
    console.log('   - 20 People');
}

