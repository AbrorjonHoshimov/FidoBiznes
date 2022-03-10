package com.example.fidobiznesserver.repository;

import com.example.fidobiznesserver.Payload.ApiResponse;
import com.example.fidobiznesserver.Payload.FilterDto;
import com.example.fidobiznesserver.Payload.FormDoc;
import com.example.fidobiznesserver.Payload.FormDocInfo;
import com.example.fidobiznesserver.dao.FormDocumentDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.sql.Date;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@Repository
public class FormDocumentRepository implements FormDocumentDao<FormDoc> {
    private static final Logger log = LoggerFactory.getLogger(FormDocumentRepository.class);

    public static String query = "select d.name , doc.name,f.attchment_id,f.access,f.card_control,f.reg_num,f.expire_date,f.reg_date,f.send_date,f.send_doc_num,f.some_reference,f.theme, f.id from form_documents f join delivery_type d  on f.delivery_type_id = d.id join doc_sender doc on f.doc_sender_id = doc.id";

    @Autowired
    JdbcTemplate jdbcTemplate;

    RowMapper<FormDocInfo> rowMapper = (rs, rowNum) -> {
        FormDocInfo formDoc = new FormDocInfo();
        formDoc.setId(rs.getInt("id"));
        formDoc.setAccess(rs.getBoolean("access"));
        formDoc.setCardControl(rs.getBoolean("card_control"));
        formDoc.setRegNum(rs.getString("reg_num"));
        formDoc.setExpireDate(rs.getDate("expire_date"));
        formDoc.setRegDate(rs.getDate("reg_date"));
        formDoc.setSendDate(rs.getDate("send_date"));
        formDoc.setSendDocNum(rs.getString("send_doc_num"));
        formDoc.setSomeReference(rs.getString("some_reference"));
        formDoc.setTheme(rs.getString("theme"));
        formDoc.setDeliveryType(rs.getString("name"));
        formDoc.setSenderName(rs.getString(2));
        formDoc.setAttachmentId(rs.getInt("attchment_id"));
        return formDoc;
    };

    public List<FormDocInfo> pageable(int page, int size) {
        String sql = "select d.name , doc.name,f.attchment_id,f.access,f.card_control,f.reg_num,f.expire_date,f.reg_date," +
                "f.send_date,f.send_doc_num,f.some_reference,f.theme, f.id from form_document f " +
                "join delivery_type d  on f.delivery_type_id = d.id join doc_sender doc on f.doc_sender_id = doc.id " +
                "order by f.id offset " + page * size + " limit " + size;
        return jdbcTemplate.query(sql, rowMapper);

    }

    public List<FormDocInfo> list() {
        return jdbcTemplate.query(query, rowMapper);
    }

    @Override
    public ApiResponse create(FormDoc formDoc) {

        Date regDate = formDoc.getRegDate();
        Calendar calendar = Calendar.getInstance();
        long time = calendar.getTimeInMillis();
        Date date = new Date(time);
        Calendar calendar1 = Calendar.getInstance();
        long time1 = calendar1.getTimeInMillis();
        int month = formDoc.getRegDate().getMonth();
        String existRegNum = "SELECT COUNT(reg_num) FROM form_documents WHERE reg_num=" + "\'" + formDoc.getRegNum() + "\'";
        Integer integer = jdbcTemplate.queryForObject(existRegNum, Integer.class);

        if (integer != 1) {
            if (time <= time1) {
                 if (formDoc.getAttchmentId()==0&&formDoc.getDeliveryTypeId()==0){
                    String sql = "insert into form_documents(access,card_control,reg_num,expire_date,reg_date," +
                            " send_date,send_doc_num,some_reference,theme,doc_sender_id) " +
                            "values(?,?,?,?,?,?,?,?,?,?)";
                    int insert = jdbcTemplate.update(sql, formDoc.isAccess(), formDoc.isCardControl(), formDoc.getRegNum(), formDoc.getExpireDate(),
                            date, formDoc.getSendDate(), formDoc.getSendDocNum(), formDoc.getSomeReference(),
                            formDoc.getTheme(), formDoc.getDocSenderId());
                    if (insert == 1) {
                        return new ApiResponse(true, "saqlandi");
                    } else {
                        return new ApiResponse(false, "xatolik");
                    }
                }
                else if (formDoc.getAttchmentId() == 0) {
                    String sql = "insert into form_documents(access,card_control,reg_num,expire_date,reg_date," +
                            " send_date,send_doc_num,some_reference,theme,delivery_type_id,doc_sender_id) " +
                            "values(?,?,?,?,?,?,?,?,?,?,?)";
                    int insert = jdbcTemplate.update(sql, formDoc.isAccess(), formDoc.isCardControl(), formDoc.getRegNum(), formDoc.getExpireDate(),
                            date, formDoc.getSendDate(), formDoc.getSendDocNum(), formDoc.getSomeReference(),
                            formDoc.getTheme(), formDoc.getDeliveryTypeId(), formDoc.getDocSenderId());
                    if (insert == 1) {
                        return new ApiResponse(true, "saqlandi");
                    } else {
                        return new ApiResponse(false, "xatolik");
                    }
                }else if (formDoc.getDeliveryTypeId()==0){
                    String sql = "insert into form_documents(access,card_control,reg_num,expire_date,reg_date," +
                            " send_date,send_doc_num,some_reference,theme,doc_sender_id,attchment_id) " +
                            "values(?,?,?,?,?,?,?,?,?,?,?)";
                    int insert = jdbcTemplate.update(sql, formDoc.isAccess(), formDoc.isCardControl(), formDoc.getRegNum(), formDoc.getExpireDate(),
                            date, formDoc.getSendDate(), formDoc.getSendDocNum(), formDoc.getSomeReference(),
                            formDoc.getTheme(),  formDoc.getDocSenderId(),formDoc.getAttchmentId());
                    if (insert == 1) {
                        return new ApiResponse(true, "saqlandi");
                    } else {
                        return new ApiResponse(false, "xatolik");
                    }
                }
                else {
                    String sql = "insert into form_documents(access,card_control,reg_num,expire_date,reg_date," +
                            " send_date,send_doc_num,some_reference,theme,delivery_type_id,doc_sender_id,attchment_id) " +
                            "values(?,?,?,?,?,?,?,?,?,?,?,?)";
                    int insert = jdbcTemplate.update(sql, formDoc.isAccess(), formDoc.isCardControl(), formDoc.getRegNum(), formDoc.getExpireDate(),
                            date, formDoc.getSendDate(), formDoc.getSendDocNum(), formDoc.getSomeReference(),
                            formDoc.getTheme(), formDoc.getDeliveryTypeId(), formDoc.getDocSenderId(),formDoc.getAttchmentId());
                    if (insert == 1) {
                        return new ApiResponse(true, "saqlandi");
                    } else {
                        return new ApiResponse(false, "xatolik");
                    }
                }

            } else {
                return new ApiResponse(false, "Xato vaqt berildi");
            }

        } else {
            return new ApiResponse(false, "Bunday reg raqam mavjud");
        }
    }



    @Override
    public FormDoc get(int id) {
        FormDoc formDoc = jdbcTemplate.queryForObject("SELECT * FROM form_documents WHERE id=?",
                BeanPropertyRowMapper.newInstance(FormDoc.class), id);
        return formDoc;
    }

    @Override
    public ApiResponse update(FormDoc formDoc, int id) {
        String sql = "update form_documents set access=?,card_control=?,reg_num=?,expire_date=?,reg_date=?,send_date=?,send_doc_num=?,some_reference=?,theme=?,delivery_type_id=?,doc_sender_id=?,attchment_id=? where id=" + id;
        int update = jdbcTemplate.update(sql, formDoc.isAccess(), formDoc.isCardControl(), formDoc.getRegNum(), formDoc.getExpireDate(),
                formDoc.getRegDate(), formDoc.getSendDate(), formDoc.getSendDocNum(), formDoc.getSomeReference(),
                formDoc.getTheme(), formDoc.getDeliveryTypeId(), formDoc.getDocSenderId(), formDoc.getAttchmentId());
        if (update == 1) {
            return new ApiResponse(true, "O'zgartirildi");
        } else {
            return new ApiResponse(false, "Xatolik");
        }
    }

    @Override
    public ApiResponse delete(int id) {
        int delete = jdbcTemplate.update("delete from form_documents where id=" + id);
        if (delete == 1) {
            return new ApiResponse(true, "Ochirildi");
        } else {
            return new ApiResponse(false, "Ochirilmadi");
        }
    }

    public List<FormDocInfo> orderByRegNum(boolean sort) {
        if (sort) {
            String sql = query + " order by reg_num desc";
            return jdbcTemplate.query(sql, rowMapper);
        } else {
            String sql =query+" order by reg_num";
            return jdbcTemplate.query(sql, rowMapper);
        }
    }

    public List<FormDocInfo> orderByRegDate(boolean sort) {
        if (sort) {
            String sql = query+" order by reg_date desc";
            return jdbcTemplate.query(sql, rowMapper);
        } else {
            String sql = query+" order by  reg_date";
            return jdbcTemplate.query(sql, rowMapper);
        }
    }

    public List<FormDocInfo> orderBySendNum(boolean sort) {
        if (sort) {
            String sql = query+" order by send_doc_num desc";
            return jdbcTemplate.query(sql, rowMapper);
        } else {
            String sql = query+"  order by  send_doc_num";
            return jdbcTemplate.query(sql, rowMapper);
        }
    }

    public List<FormDocInfo> orderBySendDate(boolean sort) {
        if (sort) {
            String sql = query+" order by send_date desc";
            return jdbcTemplate.query(sql, rowMapper);
        } else {
            String sql = query+" order by  send_date";
            return jdbcTemplate.query(sql, rowMapper);
        }
    }

    public List<FormDocInfo> orderByDeliveryType(boolean sort) {
        if (sort) {
            String sql = query+" order by d.name desc";
            return jdbcTemplate.query(sql, rowMapper);
        } else {
            String sql =query+ " order by  d.name";
            return jdbcTemplate.query(sql, rowMapper);
        }
    }

    public List<FormDocInfo> orderBySender(boolean sort) {
        if (sort) {
            String sql = query+" order by doc.name desc";
            return jdbcTemplate.query(sql, rowMapper);
        } else {
            String sql = query+" order by  doc.name";
            return jdbcTemplate.query(sql, rowMapper);
        }
    }

    public List<FormDocInfo> orderByTheme(boolean sort) {
        if (sort) {
            String sql = query+" order by theme desc";
            return jdbcTemplate.query(sql, rowMapper);
        } else {
            String sql = query+" order by  theme";
            return jdbcTemplate.query(sql, rowMapper);
        }
    }

    public List<FormDocInfo> orderByDescription(boolean sort) {
        if (sort) {
            String sql = query+" order by some_reference desc";
            return jdbcTemplate.query(sql, rowMapper);
        } else {
            String sql = query+" order by  some_reference";
            return jdbcTemplate.query(sql, rowMapper);
        }
    }
    public List<FormDocInfo> orderByExpireDate(boolean sort) {
        if (sort) {
            String sql = query+" order by expire_date desc";
            return jdbcTemplate.query(sql, rowMapper);
        } else {
            String sql = query+" order by  expire_date";
            return jdbcTemplate.query(sql, rowMapper);
        }
    }


    public List<FormDocInfo> filter(FilterDto filterDto){

        if (filterDto!=null) {
            String baseOperator="and";
            StringBuilder query=new StringBuilder()
                    .append("select d.name , doc.name,f.attchment_id,f.access,f.card_control,f.reg_num,f.expire_date,f.reg_date,f.send_date,f.send_doc_num,f.some_reference,f.theme, f.id from form_documents f join delivery_type d  on f.delivery_type_id = d.id join doc_sender doc on f.doc_sender_id = doc.id");

            query.append(" where ");

            if (filterDto.getRegNum()!=null) {
                query
                        .append(" f.reg_num ilike '")
                        .append(filterDto.getRegNum())
                        .append("%' ")
                        .append(baseOperator);
            }
            if (filterDto.getRegDateStart()!=null&&filterDto.getRegDateEnd()!=null){
                query
                        .append(" f.reg_date between '")
                        .append(filterDto.getRegDateStart())
                        .append("' and '")
                        .append(filterDto.getRegDateEnd())
                        .append("' ")
                        .append(baseOperator);
            }
            if (filterDto.getTheme()!=null){
            query
                    .append(" f.theme ilike '")
                    .append(filterDto.getTheme())
                    .append("%' ")
                    .append(baseOperator);
            }
            if (filterDto.getSendDateStart()!=null&&filterDto.getSendDateEnd()!=null){
                query.append(" f.send_date between '")
                        .append(filterDto.getSendDateStart())
                        .append("' and '")
                        .append(filterDto.getSendDateEnd())
                        .append("' ")
                        .append(baseOperator);
            }
            if (filterDto.getCorrespondentId()!=0){
                query.append(" f.doc_sender_id=")
                        .append(filterDto.getCorrespondentId()).append(" ")
                        .append(baseOperator);

            }
            if (filterDto.getDeliveryTypeId()!=0){
                query.append(" f.delivery_type_id=")
                        .append(filterDto.getDeliveryTypeId()).append(" ")
                        .append(baseOperator);
            }
            if (filterDto.getSomeReference()!=null&&!filterDto.getSomeReference().isEmpty()){
                query.append(" f.some_reference ilike '")
                        .append(filterDto.getSomeReference())
                        .append("%' ")
                        .append(baseOperator);
            }
            if (filterDto.getSendDocNum()!=null) {
                query.append(" f.send_doc_num ilike '")
                        .append(filterDto.getSendDocNum())
                        .append("%' ")
                        .append(baseOperator);

            }
            String substring = query.substring(0, query.length()-baseOperator.length());
            substring=substring+";";
            List<FormDocInfo> query1 = jdbcTemplate.query(substring, rowMapper);
            return query1;
        }

        return list();
    }


    public List<FormDocInfo> cbGmail(int id){
        if (id==1){
            LocalDate todaydate = LocalDate.now();
            LocalDate date = todaydate.withDayOfMonth(1);
            String between = query + " where doc_sender_id=1 and delivery_type_id=6 and reg_date between  \'"+ date + "\' AND \'"+ todaydate +"\'" ;
            return jdbcTemplate.query(between, rowMapper);
        }
       else if(id==2){
            LocalDate todaydate = LocalDate.now();
            int year = todaydate.getYear();
            String between = query+" where (doc_sender_id!=2 or delivery_type_id!=8) and  reg_date BETWEEN \'"+ year + "-01-01\' AND \'"+ year +"-03-31\'" ;
            return jdbcTemplate.query(between,rowMapper);
        }else {
            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.MONTH, -1);

            int date = calendar.getActualMaximum(Calendar.DATE);
            int month = calendar.get(Calendar.MONTH) + 1;
            int year = calendar.get(Calendar.YEAR);

            String between = query+ " where (doc_sender_id=3 and  theme not ilike '%kredit%') and  reg_date  BETWEEN \'"+ year + "-"+month+"-01\' AND \'"+ year +"-"+month+"-"+date+"\'" ;
            return jdbcTemplate.query(between, rowMapper);

        }

    }
}
