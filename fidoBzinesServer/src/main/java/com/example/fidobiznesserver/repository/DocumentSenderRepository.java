package com.example.fidobiznesserver.repository;

import com.example.fidobiznesserver.Payload.DocumentSender;
import com.example.fidobiznesserver.dao.DocumentSenderDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DocumentSenderRepository implements DocumentSenderDao<DocumentSender> {

    private static final Logger log = LoggerFactory.getLogger(DocumentSenderRepository.class);

    @Autowired
    JdbcTemplate jdbcTemplate;

    RowMapper<DocumentSender> rowMapper = (rs, rowNum) -> {
        DocumentSender documentSender = new DocumentSender();
        documentSender.setId(rs.getInt("id"));
        documentSender.setName(rs.getString("name"));
        return documentSender;
    };

    @Override
    public List<DocumentSender> list() {
        String sql = "select * from doc_sender";
        return jdbcTemplate.query(sql,rowMapper);
    }
}
