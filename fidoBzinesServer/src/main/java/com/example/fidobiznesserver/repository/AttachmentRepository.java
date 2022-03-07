package com.example.fidobiznesserver.repository;

import com.example.fidobiznesserver.Payload.ApiResponse;
import com.example.fidobiznesserver.Payload.Attachment;
import com.example.fidobiznesserver.Payload.DocumentSender;
import com.example.fidobiznesserver.Payload.FormDoc;
import com.example.fidobiznesserver.dao.AttachmentDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class AttachmentRepository implements AttachmentDao<Attachment> {
    private static final Logger log = LoggerFactory.getLogger(AttachmentRepository.class);

    @Autowired
    JdbcTemplate jdbcTemplate;

    RowMapper<Attachment> rowMapper = (rs, rowNum) -> {
        Attachment attachment = new Attachment();
        attachment.setId(rs.getInt("id"));
        attachment.setOriginal_name(rs.getString("original_name"));
        attachment.setSize(rs.getLong("size"));
        attachment.setContent_type(rs.getString("content_type"));
        attachment.setName(rs.getString("name"));
        return attachment;
    };

    @Override
    public Integer upload(Attachment attachment) {

        String query="select max(id) from attachment";
        Integer integer = jdbcTemplate.queryForObject(query, Integer.class);
        String sql = "insert into attachment (original_name,size,content_type,name) values(?,?,?,?)";
        int upload = jdbcTemplate.update(sql, attachment.getOriginal_name(), attachment.getSize(), attachment.getContent_type(), attachment.getName());

            return integer+1;

    }

//    @Override
//    public Optional<Attachment> get(int id) {
//        String sql = "select * from attachment  join form_documents fd on attachment.form_doc_id = fd.id where form_doc_id=?";
//        Attachment attachment = null;
//        try {
//            attachment = jdbcTemplate.queryForObject(sql, new Object[]{id}, rowMapper);
//        }catch (Exception e){
//            return null;
//        }
//        return Optional.ofNullable(attachment);
//    }


    public Attachment findById(int id) {
        try {
            Attachment attachment = jdbcTemplate.queryForObject("SELECT * FROM attachment as a WHERE a.id = ?",
                    BeanPropertyRowMapper.newInstance(Attachment.class), id);
            return attachment;

        } catch (IncorrectResultSizeDataAccessException e) {
            return null;
        }
    }
}
