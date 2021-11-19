import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();
    return (
        <div>
            <h1 className="Center">{<Trans>{t("Hello, world!")}</Trans>}</h1>
        </div>
    );
}

export default Home;
