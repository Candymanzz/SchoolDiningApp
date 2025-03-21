import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { setPreferences, setTotalCount, setPage } from '../store/preferencesSlice'
import Pages from '../components/Pages'
import PreferenceList from '../components/PreferenceList'
import { fetchPreferences } from '../http/modelAPI'

export default function PreferenceMenu() {
    const { preferences, page, totalCount, limit } = useSelector((state) => state.preferences)
    const dispatch = useDispatch()

    const handlePreferences = (data) => dispatch(setPreferences(data))
    const handleTotalCount = (count) => dispatch(setTotalCount(count))
    const handlePage = (p) => dispatch(setPage(p))

    useEffect(() => {
        fetchPreferences(page, limit).then(data => {
            handlePreferences(data.rows)
            handleTotalCount(data.count)
        })
    }, [page])

    return (
        <Container>
            <Row className="mt-2">
                <Col className="mt-2">
                    <PreferenceList preferences={preferences} />
                </Col>
            </Row>
        </Container>
    )
}
