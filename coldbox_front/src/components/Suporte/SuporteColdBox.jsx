import React from 'react';
import './SuporteColdBox.css';

const SuporteColdBox = () => {
    return (
        <div className="paginaSuporte"> {/* Adicionando a classe pai exclusiva */}
            <div className="containerSuporte">
                <h1 className="tituloSuporte">Suporte ColdBox</h1>
                <p className="welcome-text">Bem-vindo à Central de Suporte da ColdBox!</p>
                <p className="description">
                    Na ColdBox, entendemos a importância de manter suas câmaras frias funcionando perfeitamente para garantir a segurança e a qualidade dos seus produtos. Nossa equipe de suporte está aqui para ajudar você a resolver qualquer problema e a garantir que seu sistema de monitoramento opere com a máxima eficiência.
                </p>
                <h2 className="subtitle">Como Podemos Ajudar?</h2>
                <ol className="support-list">
                    <li><strong>Atendimento ao Cliente:</strong> Nossa equipe de atendimento está disponível para responder às suas perguntas e fornecer suporte técnico. Entre em contato conosco por telefone, e-mail ou chat ao vivo para obter assistência imediata.</li>
                    <li><strong>Solução de Problemas:</strong> Enfrentando dificuldades com seu sistema ColdBox? Consulte nosso guia de solução de problemas para resolver problemas comuns de forma rápida e eficaz. Se precisar de ajuda adicional, nossos técnicos especializados estão prontos para ajudar.</li>
                    <li><strong>Manutenção e Atualizações:</strong> Oferecemos serviços de manutenção preventiva e atualizações de software para garantir que seu sistema ColdBox continue funcionando de maneira otimizada. Agende uma visita técnica ou solicite informações sobre as últimas atualizações disponíveis.</li>
                    <li><strong>Treinamento e Recursos:</strong> Acesse nossa biblioteca de recursos para encontrar manuais, tutoriais em vídeo e FAQs que ajudarão você a tirar o máximo proveito do seu sistema ColdBox. Também oferecemos sessões de treinamento personalizadas para sua equipe.</li>
                    <li><strong>Relatórios e Análises:</strong> Precisa de ajuda com a interpretação de relatórios de monitoramento? Nossa equipe pode fornecer análises detalhadas e consultoria para ajudar você a tomar decisões informadas sobre a gestão de suas câmaras frias.</li>
                </ol>
                <h2 className="subtitle">Contato</h2>
                <p className="contact-info">
                    Estamos aqui para ajudar! Entre em contato conosco através dos seguintes canais:
                </p>
                <ul className="contact-list">
                    <li><strong>Telefone:</strong> (XX) XXXX-XXXX</li>
                    <li><strong>E-mail:</strong> suporte@coldbox.com</li>
                </ul>
                <p className="footer-text">
                    A equipe da ColdBox está comprometida em oferecer suporte excepcional para garantir a continuidade e a eficiência das suas operações de armazenamento e refrigeração. Conte conosco sempre que precisar!
                </p>
                <p className="footer-company">ColdBox - Tecnologia em Monitoramento de Câmaras Frias para um Controle Total e Seguro.</p>
            </div>
        </div>
    );
};

export default SuporteColdBox;
