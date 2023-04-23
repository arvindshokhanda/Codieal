import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import {  useState} from 'react';
import { useToasts } from 'react-toast-notifications';


const Settings = () => {
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formSaving, setFormSaving] = useState(false);
  const {addToast}  = useToasts();

  const clearForm = ()=>{
    setPassword('');
    setConfirmPassword('');
  }
  const updateProfile = async () =>{
    console.log("auth", auth);
    setFormSaving(true);
    let error = false;
    if(!name || !password || !confirmPassword){
        addToast('All the fields are required',{
          appearance: 'error'
        })
        error = true;
    }
    if(password !== confirmPassword){  
      addToast('Password and confirmPasswrod does *********** not Match', {
        appearance: 'error'
      })
      error = true
    }
    if(error){
      return setFormSaving(false);
    }
    const repsonse  = await auth.updateUser(auth.user._id, name, password, confirmPassword);
    if(repsonse.success){
      setEditMode(false);
      setFormSaving(false);
      clearForm();
      return addToast(' User Updated Successfully', {
        appearance: 'success'
      })
    }else{
      return addToast(repsonse.message, {
        appearance: 'error'
      })
    }
  }
  const handleEditMode = () => {
    
    setEditMode(true);
    setName(auth.user.name);
  }
  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/706/706807.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode? 
          <input type = "text"   value = {name} onChange = {(e)=>setName(e.target.value)} />:
        
             <div className={styles.fieldValue}>{auth.user?.name}</div>
        }
       
      </div>
      {editMode && (
        <div>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input type="password"   value = {password} onChange = {(e)=>setPassword(e.target.value)} />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel} >Confirm Password</div>
            <input type="password"   value = {confirmPassword} onChange = {(e)=>setConfirmPassword(e.target.value)} />
          </div>
        </div>
      )}

      <div className={styles.btnGrp}>
        {editMode? 
          <button className={`button ${styles.editBtn}`} onClick = {updateProfile} disabled = {formSaving}>{ formSaving ? "Svaing Profile ...":"Save Profile"}</button>:
          <button className={`button ${styles.editBtn}`} onClick  = {handleEditMode}>Edit Profile</button>
          
        }
      </div>
    </div>
  );
};

export default Settings;
