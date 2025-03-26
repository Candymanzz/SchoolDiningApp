import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPreferences } from '../store/preferenceSlice';
import PreferenceList from './PreferenceList';
import CreatePreference from './CreatePreference';

const PreferencePage = () => {

    const dispatch = useDispatch();
    const preferences = useSelector((state) => state.preferences.items);

    useEffect(() => {
        dispatch(fetchPreferences());
    }, [dispatch]);

    return (
        <Container>
            <Row>
                <Col>
                    <h2>Предпочтения учащихся</h2>
                    <PreferenceList preferences={preferences} />
                </Col>
                <Col>
                    <h2>Добавить новое предпочтение</h2>
                    <CreatePreference />
                </Col>
            </Row>
        </Container>
    );
};

export default PreferencePage;
