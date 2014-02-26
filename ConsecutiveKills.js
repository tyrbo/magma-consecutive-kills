// Consecutive Kills Plugin
// By Peak

function On_PlayerKilled(DeathEvent) {
  if (DeathEvent.Attacker.SteamID != DeathEvent.Victim.SteamID) {
    var LastKillTime = GetLastKillTime(DeathEvent.Attacker.SteamID);
    if (LastKillTime != null) {
      var TimeStamp = Math.round(Date.now() / 1000);
      if (TimeStamp - LastKillTime <= 4) {
        var ConsecutiveKills = GetCurrentConsecutiveKills(DeathEvent.Attacker.SteamID) + 1;
        SetCurrentConsecutiveKills(DeathEvent.Attacker.SteamID, ConsecutiveKills);
        ShowConsecutiveKillsNotification(ConsecutiveKills, DeathEvent.Attacker.Name);
      } else {
        SetCurrentConsecutiveKills(DeathEvent.Attacker.SteamID, 1);
      }
    } else {
      SetLastKillTime(DeathEvent.Attacker.SteamID);
      SetCurrentConsecutiveKills(DeathEvent.Attacker.SteamID, 1);
    }
  }
}

function ShowConsecutiveKillsNotification(KillCount, Name) {
  if (KillCount == 2) {
    Server.Broadcast(Name + " has scored a double kill!");
  } else if (KillCount == 3) {
    Server.Broadcast(Name + " has scored a multi kill!");
  } else if (KillCount == 4) {
    Server.Broadcast(Name + " has scored an ultra kill!");
  } else if (KillCount == 5) {
    Server.Broadcast(Name + " has scored a megakill!");
  } else if (KillCount == 6) {
    Server.Broadcast(Name + " has scored a MONSTERKILL!");
  }
}

function GetLastKillTime(SteamID) {
  return Data.GetTableValue("lastkilltime", SteamID);
}

function SetLastKillTime(SteamID) {
  var TimeStamp = Math.round(Date.now() / 1000);
  Data.AddTableValue("lastkilltime", SteamID, TimeStamp);
}

function GetCurrentConsecutiveKills(SteamID) {
  return Data.GetTableValue("consecutivekills", SteamID);
}

function SetCurrentConsecutiveKills(SteamID, KillCount) {
  Data.AddTableValue("consecutivekills", SteamID, KillCount);
}

